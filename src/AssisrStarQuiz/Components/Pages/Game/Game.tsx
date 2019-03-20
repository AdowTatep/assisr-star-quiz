import React from "react";
import { GameStateEnum } from "../../../Enums/GameStateEnum";
import Menu from "../../Elements/Menu/Menu";
import "./Game.scss";

interface IGameProps {

}

interface IGameState {
    gameState: GameStateEnum;
}

export class Game extends React.Component<IGameProps, IGameState> {
    constructor(props: IGameProps) {
        super(props);
        this.state = {
            gameState: GameStateEnum.Menu, // Initializes on menu state
        };
    }
    public render() {
        return (
            <div className={`page-game`}>
                {this.getGameState(this.state.gameState)}
            </div>
        );
    }

    // Returns the game state machine
    private getGameState(gameState: GameStateEnum): React.ReactNode {
        if (gameState === GameStateEnum.Menu) {
            return <Menu onStartClick={() => this.setStateMachine(GameStateEnum.Playing)} />;
        }

        return null;
    }

    private setStateMachine(state: GameStateEnum): void {
        this.setState({ gameState: state });
    }
}
