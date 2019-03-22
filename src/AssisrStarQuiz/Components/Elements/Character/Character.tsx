import React from "react";
import { QuizContext } from "../../../Contexts/QuizContext";
import { ICharacter } from "../../../Interfaces/ICharacter";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import AsyncImage from "../AsyncImage/AsyncImage";
import CharacterTip from "../CharacterTip/CharacterTip";
import "./Character.scss";

interface ICharacterProps {
    character?: ICharacter;
    fake?: boolean;
    correct?: boolean;
    onScore: (score: number, character: ICharacter) => void;
}

interface ICharacterState {
    isModalOpenned: boolean;
    characterImage: string;
    multiplier: number;
    scoreValue: number;
    correct: boolean;
    nameInput: string;
}

export default class Character extends React.Component<ICharacterProps, ICharacterState> {

    public static contextType = QuizContext;
    public context!: React.ContextType<typeof QuizContext>;

    constructor(props: ICharacterProps) {
        super(props);
        this.state = {
            isModalOpenned: false,
            characterImage: "",
            multiplier: 2,
            scoreValue: 5,
            correct: this.props.correct ? this.props.correct : false,
            nameInput: "",
        };
    }

    public async componentDidMount() {
        this.getImageUrl();
    }

    public render() {
        return (
            <div className={`elem-character`}>
                <div className="image">
                    {this.getImage(this.state.characterImage)}
                </div>
                <div className="actions">
                    <input
                        className={this.state.correct ? "correct" : ""}
                        placeholder="Character name..."
                        onChange={this.onInputChange.bind(this)}
                        value={this.props.correct ? (this.props.character ? this.props.character.name : "") : this.state.nameInput}
                        disabled={this.state.correct || this.props.fake} />
                    <Button onClick={this.openTip.bind(this)} disabled={this.state.correct || this.props.fake}>...</Button>
                </div>
                {this.state.isModalOpenned ?
                    <Modal onClose={() => this.closeTip()}>{this.getTip(this.props.character, this.state.characterImage)}</Modal> : null}
            </div>
        );
    }

    private getImage(imageUrl: string) {
        // Fake it until you make it =)
        const fake = <div className="fake"></div>;

        if (imageUrl) {
            return <AsyncImage src={imageUrl} loader={fake} />;
        } else {
            return fake;
        }
    }

    private getTip(character: ICharacter | undefined, imageUrl: string): React.ReactNode {
        if (character) {
            return <CharacterTip character={character} imageComponent={this.getImage(imageUrl)} />;
        } else {
            return null;
        }
    }

    private openTip() {
        this.setState({ isModalOpenned: true, multiplier: 1 });
    }

    private closeTip() {
        this.setState({ isModalOpenned: false });
    }

    private onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        // Cannot score twice
        if (event && !this.state.correct) {
            const target = event.target;
            if (target) {
                // If nothing is undefined
                if (target.value && this.props.character && this.props.character.name) {
                    // I don't actually check if the text is EXACTLY like the other, just a bit similar
                    const processString = (str: string) => str.trim().toLocaleLowerCase().replace("-", "").replace(" ", "");
                    // If value is the same as the name
                    if (processString(target.value) === processString(this.props.character.name)) {
                        this.onScore();
                    }
                }
                this.setState({ nameInput: target.value });
            }
        }
    }

    private onScore() {
        if (this.props.onScore && this.props.character) {
            const { multiplier, scoreValue } = this.state;
            this.props.onScore(multiplier * scoreValue, this.props.character);
            this.setState({ correct: true });
        }
    }

    private async getImageUrl() {
        const { imageSearchService } = this.context;
        if (imageSearchService) {
            // If the character is loaded, its name exists and the image wasn't loaded yet
            if (this.props.character && this.props.character.name && !this.state.characterImage) {
                try {
                    // Search the character image
                    const splittedName = this.props.character.name.split(" ");
                    const name = splittedName.length === 1
                        ? splittedName[0]
                        : splittedName[0] + " " + splittedName[splittedName.length - 1];
                    const characterImage = await imageSearchService.query(`${name} star wars`);
                    if (characterImage) {
                        this.setState({ characterImage });
                    }
                } catch (ex) {
                    console.error("Couldn't retrieve image: " + ex);
                }
            }
        }
    }
}
