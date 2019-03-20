import React from "react";
import "./AssisrStarQuiz.scss";
import Game from "./Components/Pages/Game/Game";

export default class AssisrStarQuiz extends React.Component {
    public render() {
        return (
            <div className={`root-star-quiz`}>
                <Game />
            </div>
        );
    }
}
