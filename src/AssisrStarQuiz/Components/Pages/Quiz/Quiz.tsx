import React from "react";
import { QuizContext } from "../../../Contexts/QuizContext";
import { ICharacter } from "../../../Interfaces/ICharacter";
import IRank from "../../../Interfaces/IRank";
import RankService from "../../../Services/RankService";
import Character from "../../Elements/Character/Character";
import Counter from "../../Elements/Counter/Counter";
import Finished from "../../Elements/Finished/Finished";
import Button from "../../UI/Button/Button";
import Header from "../../UI/Header/Header";
import Modal from "../../UI/Modal/Modal";
import { countdownLimitInSeconds } from "./../../../Config.json";
import "./Quiz.scss";

interface IQuizProps {
    history?: any;
}

interface IQuizState {
    characters?: ICharacter[];
    previousPage?: boolean;
    nextPage?: boolean;
    currentPage: number;
    totalScore: number;
    finished: boolean;
}

export default class Quiz extends React.Component<IQuizProps, IQuizState> {
    public static contextType = QuizContext;
    public context!: React.ContextType<typeof QuizContext>;

    constructor(props: IQuizProps) {
        super(props);
        this.state = {
            characters: undefined,
            currentPage: 0,
            totalScore: 0,
            finished: false,
        };
    }

    public async componentDidMount() {
        this.loadPage(this.state.currentPage);
    }

    public render() {
        return (
            <div className={`elem-quiz`}>
                <div className="top">
                    <Header />
                    <div className="scoring">
                        <h1>{this.state.totalScore}</h1>
                        <Counter limitInSeconds={countdownLimitInSeconds} onLimit={this.timerFinished.bind(this)} />
                    </div>
                </div>
                <div className="actions">
                    <Button content="<< Previous page" onClick={this.previousPage.bind(this)} disabled={!this.state.previousPage} />
                    <Button content="Next page >>" onClick={this.nextPage.bind(this)} disabled={!this.state.nextPage} />
                </div>
                <div className="cards">
                    {this.getCharacters(this.state.characters)}
                </div>
                {this.state.finished ?
                    <Modal>
                        <Finished score={this.state.totalScore} onSubmit={this.rankSubmit.bind(this)} />
                    </Modal> : null}
            </div>
        );
    }

    private getCharacters(characters: ICharacter[] | undefined): React.ReactNode {
        const charElement = (fake: boolean, char: ICharacter | undefined, key: string) => {
            return <Character character={char} fake={fake} key={key} onScore={this.onCorrectName.bind(this)} />;
        };

        // Fake it until you make it =)
        // Only show "real" characters when they're loaded
        if (characters && characters.length > 0) {
            return characters.map((char, index) =>
                charElement(false, char, char ? (char.name ? char.name.replace(" ", "") : index.toString()) : index.toString()));
        } else {
            // Creates an empty array, using the spread operator to fill items with "undefined"
            return [...new Array(10)].map((char, index) => charElement(true, char, index.toString()));
        }
    }

    private async nextPage() {
        if (this.state.nextPage) {
            this.loadPage(this.state.currentPage + 1);
        }
    }

    private async previousPage() {
        if (this.state.previousPage) {
            this.loadPage(this.state.currentPage - 1);
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

    private onCorrectName(score: number): void {
        if (!this.state.finished) {
            this.setState({ totalScore: this.state.totalScore + score });
        }
    }

    private timerFinished(): void {
        this.setState({ finished: true });
    }

    private rankSubmit(rank: IRank): void {
        RankService.insertRank(rank);
        if (this.props.history) {
            this.props.history.push("/");
        }
    }
}
