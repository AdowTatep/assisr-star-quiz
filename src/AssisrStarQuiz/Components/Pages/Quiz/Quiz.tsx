import React from "react";
import { ICharacter } from "../../../Interfaces/ICharacter";
import CharacterService from "../../../Services/CharacterService";
import Character from "../../Elements/Character/Character";
import Counter from "../../Elements/Counter/Counter";
import Header from "../../UI/Header/Header";
import "./Quiz.scss";

interface IQuizProps {

}

interface IQuizState {
    characters?: ICharacter[];
}

export default class Quiz extends React.Component<IQuizProps, IQuizState> {
    // Todo: Move to context api
    private service = new CharacterService();

    constructor(props: IQuizProps) {
        super(props);
        this.state = {
            characters: undefined,
        }
    }

    public async componentDidMount() {
        try {
            const { characters } = await this.service.characters();
            this.setState({ characters });
        } catch {
            console.error("Couldn't retrieve characters");
        }
    }

    public render() {
        return (
            <div className={`elem-quiz`}>
                <div className="top">
                    <Header />
                    <Counter />
                </div>
                <div className="cards">
                    {this.getCharacters(this.state.characters)}
                </div>
            </div>
        );
    }

    private getCharacters(characters: ICharacter[] | undefined): React.ReactNode {
        const charElement = (fake: boolean, char: ICharacter | undefined, index: number) => {
            return <Character character={char} fake={fake} key={index.toString()} />;
        };

        if (characters && characters.length > 0) {
            console.log("Loaded");
            return characters.map((char, index) => charElement(false, char, index));
        } else {
            // Creates an empty array, using the spread operator to fill items with "undefined"
            return [...new Array(10)].map((char, index) => charElement(true, char, index));
        }
    }
}
