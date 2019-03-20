import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./AssisrStarQuiz.scss";
import Menu from "./Components/Pages/Menu/Menu";
import Quiz from "./Components/Pages/Quiz/Quiz";

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
                <BrowserRouter>
                    <Route path="/" exact component={Menu} />
                    <Route path="/quiz/" component={Quiz} />
                </BrowserRouter>
                <audio autoPlay loop id="sound">
                    <source src="./static/sound/darth.mp3" type="audio/mpeg" />
                </audio>
            </div>
        );
    }
}
