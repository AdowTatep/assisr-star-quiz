import { swApi } from "../Config.json";
import { ICharacter } from "../Interfaces/ICharacter";
import { IFilm } from "../Interfaces/IFilm.js";
import { IPeople } from "../Interfaces/IPeople";
import { IPlanet } from "../Interfaces/IPlanet.js";
import { ISpecie } from "../Interfaces/ISpecie.js";
import { IVehicle } from "../Interfaces/IVehicle.js";
import HttpService from "./HttpService";

export interface IListResult {
    characters?: ICharacter[];
    previousPage?: boolean;
    nextPage?: boolean;
}

export default class CharacterService {
    private http = new HttpService();
    private cachedCharacterPages = new Array<IPeople>();
    private cachedSpecies = new Array<ISpecie>();
    private cachedPlanets = new Array<IPlanet>();
    private cachedFilms = new Array<IFilm>();

    private cachedVehicles = new Array<IVehicle>();

    /// Returns a list of charaters and if there's previous or next page
    public async characters(page: number = 0, limit: boolean = false): Promise<IListResult> {
        let people: IPeople | undefined;

        // Find if this page was loaded already
        if (this.cachedCharacterPages && this.cachedCharacterPages[page]) {
            people = this.cachedCharacterPages[page];
        } else {
            // If not, load the page
            people = await this.http.get<IPeople>(`${swApi}/people?page=${page + 1}`);

            if (people) {
                // Cache it
                this.cachedCharacterPages[page] = people;
            }
        }

        if (!limit && people && people.next) {
            // Fire and forget: find and cache next page for faster paging
            this.characters(page + 1, true);
        }

        // Then return it
        return {
            characters: people ? people.results : undefined,
            previousPage: people ? (people.previous ? true : false) : undefined,
            nextPage: people ? (people.next ? true : false) : undefined,
        };
    }

    /// Returns a specific character's specie
    public async specie(character: ICharacter | undefined): Promise<string | undefined> {
        if (character && character.species && character.species[0]) {
            const url = character.species[0];
            return await this.fetchSingleCached<ISpecie, string>(url,
                this.cachedSpecies,
                (x) => x.url === url, // The check to execute to see if it's cachec
                (specie) => specie ? specie.name : undefined); // The return predicate to select which property to return
        } else {
            return undefined;
        }
    }

    /// Returns a specific character's planet
    public async planet(character: ICharacter | undefined): Promise<string | undefined> {
        if (character) {
            const url = character.homeworld;
            return await this.fetchSingleCached<IPlanet, string>(url,
                this.cachedPlanets,
                (x) => x.url === url,
                (planet) => planet ? planet.name : undefined);
        } else {
            return undefined;
        }
    }

    /// Returns a specific character's set of movies
    public async films(character: ICharacter | undefined): Promise<string | undefined> {
        if (character) {
            return await this.fetchMultipleCached(character.films,
                this.cachedFilms,
                (x, y) => x.url === y,
                (film) => film ? film.title : undefined,
                (movies) => movies.join(", "));
        } else {
            return undefined;
        }
    }

    /// Returns a specific character's set of vehicles
    public async vehicles(character: ICharacter | undefined): Promise<string | undefined> {
        if (character) {
            return await this.fetchMultipleCached(character.vehicles,
                this.cachedVehicles,
                (x, y) => x.url === y,
                (vehicle) => vehicle ? vehicle.name : undefined,
                (vehicles) => vehicles.join(", "));
        } else {
            return undefined;
        }
    }

    private async fetchSingleCached<T, Y>(
        url: string | undefined,  // The url to get the entity from
        cache: T[], // The cache to check if the entity exists
        findInCache: (value: T) => boolean, // The function to use to check if the entity exists on the cache
        selectProperty: (value: T | undefined) => Y | undefined, // The function to select which property should return
    ): Promise<Y | undefined> {
        // Define generic entity
        let entity: T | undefined;

        if (url) {
            // If entity is cached
            const cachedEntity = cache.find(findInCache);
            if (cachedEntity) {
                entity = cachedEntity;
            } else {
                // If not cached, get
                entity = await this.http.get<T>(url);
                if (entity) {
                    // Then cache
                    cache.push(entity);
                }
            }
        }

        // After cached, return
        return selectProperty(entity);
    }

    private async fetchMultipleCached<T, Y>(
        urls: string[] | undefined, // Urls to get multiple entities from
        cache: T[], // The cache to check if the entity exists
        findInCache: (valuePredicate: T, valueIteration: string) => boolean, // Predicate to check if the entity exists on the cache
        selectProperty: (value: T | undefined) => Y | undefined, // The function to select which property should return
        entitiesReturnPredicate: (value: Array<Y | undefined>, // The function to manipulate multiple propertis that have returned
        ) => Y | undefined): Promise<Y | undefined> {
        let entities = new Array<Y | undefined>();

        if (urls && urls.length > 0) {
            const promises = new Array<Promise<Y | undefined>>();
            // For each url
            urls.forEach((url) => {
                if (url) {
                    // Make a promise to fetch a single url
                    const promise = this.fetchSingleCached<T, Y>(url,
                        cache,
                        (value) => findInCache(value, url),
                        selectProperty);

                    // Store the promise(not the result)
                    promises.push(promise);
                }
            });

            // Run all promises in parallel
            entities = await Promise.all(promises);
        }

        return entitiesReturnPredicate(entities);
    }
}
