import React from "react";
import { QuizContext } from "../../../Contexts/QuizContext";
import { ICharacter } from "../../../Interfaces/ICharacter";
import CharacterService from "../../../Services/CharacterService";
import "./CharacterTip.scss";

interface ICharacterTipProps {
    character: ICharacter;
    imageComponent: React.ReactElement;
}

interface ICharacterTipState {
    specieName?: string;
    planetName?: string;
    filmNames?: string;
    vehicleNames?: string;
}

export default class CharacterTip extends React.Component<ICharacterTipProps, ICharacterTipState> {

    public static contextType = QuizContext;
    public context!: React.ContextType<typeof QuizContext>;

    constructor(props: ICharacterTipProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        const { characterService } = this.context;
        if (characterService) {
            // They're all "fire and forget"
            this.fillSpecieName(characterService);
            this.fillPlanetName(characterService);
            this.fillFilmNames(characterService);
            this.fillVehicleNames(characterService);
        }
    }

    public render() {
        return (
            <div className="elem-characterTip">
                <div className="details">
                    <div className="image">
                        {this.props.imageComponent}
                    </div>
                    <div>
                        <h1>Details</h1>
                        <p>Specie: {this.state.specieName ? this.state.specieName : "Loading"}</p>
                        <p>Height: {this.props.character.height}</p>
                        <p className="capitalize">Hair: {this.props.character.hair_color}</p>
                        <p>Planet: {this.state.planetName ? this.state.planetName : "Loading"}</p>
                    </div>
                </div>
                <p>Movies: {this.state.filmNames ? this.state.filmNames : "Loading"}</p>
                {this.props.character.vehicles && this.props.character.vehicles.length > 0 ?
                    <p>Vehicles: {this.state.vehicleNames ? this.state.vehicleNames : "Loading"}</p> : null}
            </div>
        );
    }

    private async fillSpecieName(characterService: CharacterService) {
        const specieName = await characterService.specie(this.props.character);
        if (specieName) {
            this.setState({ specieName });
        }
    }

    private async fillPlanetName(characterService: CharacterService) {
        const planetName = await characterService.planet(this.props.character);
        if (planetName) {
            this.setState({ planetName });
        }
    }

    private async fillFilmNames(characterService: CharacterService) {
        const filmNames = await characterService.films(this.props.character);
        if (filmNames) {
            this.setState({ filmNames });
        }
    }

    private async fillVehicleNames(characterService: CharacterService) {
        const vehicleNames = await characterService.vehicles(this.props.character);
        if (vehicleNames) {
            this.setState({ vehicleNames });
        }
    }
}
