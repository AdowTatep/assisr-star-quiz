import React from "react";
import { QuizContext } from "../../../Contexts/QuizContext";
import { ICharacter } from "../../../Interfaces/ICharacter";
import CharacterService from "../../../Services/CharacterService";
import "./CharacterTip.scss";
import Loader from "../../UI/Loader/Loader";

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
                        {this.state.specieName ? <p>Specie: {this.state.specieName}</p> : <div className="loading">Specie: <Loader /></div>}
                        <p>Height: {this.props.character.height}</p>
                        <p className="capitalize">Hair: {this.props.character.hair_color}</p>
                        {this.state.planetName ? <p>Planet: {this.state.planetName}</p> : <div className="loading">Planet: <Loader /></div>}
                    </div>
                </div>
                {this.state.filmNames ? <p>Movies: {this.state.filmNames}</p> : <div className="loading">Movies: <Loader /></div>}
                {this.props.character.vehicles && this.props.character.vehicles.length > 0 ?
                    this.state.vehicleNames
                        ? <p>Vehicles: {this.state.vehicleNames}</p> : <div className="loading">Vehicles: <Loader /></div>
                    : null}
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
