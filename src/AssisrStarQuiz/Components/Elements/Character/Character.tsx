import React from "react";
import { QuizContext } from "../../../Contexts/QuizContext";
import { ICharacter } from "../../../Interfaces/ICharacter";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import AsyncImage from "../AsyncImage/AsyncImage";
import "./Character.scss";

interface ICharacterProps {
    character?: ICharacter;
    fake?: boolean;
}

interface ICharacterState {
    isModalOpenned: boolean;
    characterImage: string;
}

export default class Character extends React.Component<ICharacterProps, ICharacterState> {

    public static contextType = QuizContext;
    public context!: React.ContextType<typeof QuizContext>;

    constructor(props: ICharacterProps) {
        super(props);
        this.state = {
            isModalOpenned: false,
            characterImage: "",
        };
    }

    public async componentDidUpdate() {
        const { imageSearchService } = this.context;
        if (imageSearchService) {
            // If the character is loaded, its name exists and the image wasn't loaded yet
            if (this.props.character && this.props.character.name && !this.state.characterImage) {
                try {
                    // Search the character image
                    const characterImage = await imageSearchService.query(this.props.character.name);
                    if (characterImage) {
                        this.setState({ characterImage });
                    }
                } catch {
                    console.log("Couldn't retrieve image");
                }
            }
        }
    }

    public render() {
        return (
            <div className={`elem-character`}>
                <div className="image">
                    {this.getImage()}
                </div>
                <div className="actions">
                    <input placeholder="Character name..." />
                    <Button content={"..."} onClick={this.openTip.bind(this)} />
                </div>
                {this.state.isModalOpenned ? <Modal onClose={() => this.closeTip()}>{this.getTip()}</Modal> : null}
            </div>
        );
    }

    public getImage() {
        // Fake it until you make it =)
        if (this.state.characterImage) {
            return <AsyncImage src={this.state.characterImage} />;
        } else {
            return <div className="fake"></div>;
        }
    }

    public getTip(): React.ReactNode {
        return (<div>aaaaaa</div>);
    }

    public openTip() {
        this.setState({ isModalOpenned: true });
    }

    public closeTip() {
        this.setState({ isModalOpenned: false });
    }
}
