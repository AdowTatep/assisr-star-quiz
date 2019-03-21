import React from "react";
import { QuizContext } from "../../../Contexts/QuizContext";
import { ICharacter } from "../../../Interfaces/ICharacter";
import { IListResult } from "../../../Services/CharacterService";
import Character from "../../Elements/Character/Character";
import Counter from "../../Elements/Counter/Counter";
import Button from "../../UI/Button/Button";
import Header from "../../UI/Header/Header";
import "./Quiz.scss";

interface IQuizProps {

}

interface IQuizState {
    characters?: ICharacter[];
    previousPage?: boolean;
    nextPage?: boolean;
    currentPage: number;
}

export default class Quiz extends React.Component<IQuizProps, IQuizState> {
    public static contextType = QuizContext;
    public context!: React.ContextType<typeof QuizContext>;

    constructor(props: IQuizProps) {
        super(props);
        this.state = {
            characters: undefined,
            currentPage: 0,
        };
    }

    public async componentDidMount() {
        await this.loadPage(this.state.currentPage);
    }

    public render() {
        return (
            <div className={`elem-quiz`}>
                <div className="top">
                    <Header />
                    <Counter />
                </div>
                <div className="actions">
                    <Button content="<< Previous page" onClick={this.previousPage.bind(this)} disabled={!this.state.previousPage} />
                    <Button content="Next page >>" onClick={this.nextPage.bind(this)} disabled={!this.state.nextPage} />
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

        // Fake it until you make it =)
        // Only show "real" characters when they're loaded
        if (characters && characters.length > 0) {
            return characters.map((char, index) => charElement(false, char, index));
        } else {
            // Creates an empty array, using the spread operator to fill items with "undefined"
            return [...new Array(10)].map((char, index) => charElement(true, char, index));
        }
    }

    private async nextPage() {
        if (this.state.nextPage) {
            await this.loadPage(this.state.currentPage + 1);
        }
    }

    private async previousPage() {
        if (this.state.previousPage) {
            await this.loadPage(this.state.currentPage - 1);
        }
    }

    private async loadPage(page: number): Promise<void> {
        const { characterService } = this.context;
        if (characterService) {
            try {
                const { characters, previousPage, nextPage } = await characterService.characters(page);
                this.setState({ characters, previousPage, nextPage, currentPage: page });
            } catch {
                console.error("Couldn't retrieve characters");
            }
        }
    }
}
