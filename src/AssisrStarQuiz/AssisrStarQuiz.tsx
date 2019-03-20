import React from "react";
import "./AssisrStarQuiz.scss";
import { Game } from "./Components/Pages/Game/Game";

export default class AssisrStarQuiz extends React.Component {
    public componentDidMount() {
        const audio: any = document.getElementById("sound");
        if (audio) {
            audio.volume = 0.07;
        }
    }

    public render() {
        return (
            <div className={`root-star-quiz`}>
                <Game />
                <audio autoPlay loop id="sound">
                    <source src="./static/sound/darth.mp3" type="audio/mpeg" />
                </audio>
            </div>
        );
    }
}
