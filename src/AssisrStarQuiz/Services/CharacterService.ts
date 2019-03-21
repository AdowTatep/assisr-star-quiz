import { swApi } from "../Config.json";
import { ICharacter } from "../Interfaces/ICharacter";
import { IPeople } from "../Interfaces/IPeople";
import HttpService from "./HttpService";

interface IListResult {
    characters?: ICharacter[];
    previousPage?: boolean;
    nextPage?: boolean;
}

export default class CharacterService {
    private http = new HttpService();
    private cachedPages = new Array<IPeople>();

    public async characters(page: number = 0): Promise<IListResult> {
        let people: IPeople | undefined;

        // Find if this page was loaded already
        if (this.cachedPages && this.cachedPages[page]) {
            people = this.cachedPages[page];
        } else {
            // If not, load the page
            people = await this.http.get<IPeople>(`${swApi}/people`);
            if (people) {
                // Cache it
                this.cachedPages[page] = people;
            }
        }

        // Then return it
        return {
            characters: people ? people.results : undefined,
            previousPage: people ? (people.previous ? true : false) : undefined,
            nextPage: people ? (people.next ? true : false) : undefined,
        };
    }
}
