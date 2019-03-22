import React from "react";
import { QuizContext } from "../../../Contexts/QuizContext";
import { ICharacter } from "../../../Interfaces/ICharacter";
import Button from "../../UI/Button/Button";
import Header from "../../UI/Header/Header";
import "./Menu.scss";

interface IMenuProps {
}

export default class Menu extends React.Component<IMenuProps> {
    public static contextType = QuizContext;
    public context!: React.ContextType<typeof QuizContext>;

    constructor(props: IMenuProps) {
        super(props);
    }

    public async componentDidMount() {
        await this.preChache();
    }

    public render() {
        return (
            <div className={`elem-menu`}>
                <Header vertical={true} scale={true} />
                <div>
                    <p>Do you like star wars? Test yourself with this quiz!</p>
                    <ul>
                        <p>You have 2 minutes to correctly answer character names from star wars</p>
                        <li>Score 10 points if you answer without reading the tip</li>
                        <li>Score 5 points if you answer with the tip</li>
                    </ul>
                </div>
                <Button content={"Start Game!"} link="/quiz" />
            </div>
        );
    }

    private async preChache() {
        // I'm loading characters on the menu so it caches
        // before the user start playing the game
        const { characterService, imageSearchService } = this.context;
        if (characterService && imageSearchService) {
            const { characters } = await characterService.characters();
            if (characters) {
                characters.forEach(async (character: ICharacter) => {
                    if (character && character.name) {
                        const splittedName = character.name.split(" ");
                        const name = splittedName.length === 1
                            ? splittedName[0]
                            : splittedName[0] + " " + splittedName[splittedName.length - 1];
                        await imageSearchService.query(`${name} star wars`);
                    }
                });
            }
        }
    }
}
