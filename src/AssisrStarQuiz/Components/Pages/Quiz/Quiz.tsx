import React from "react";
import Counter from "../../Elements/Counter/Counter";
import Header from "../../UI/Header/Header";
import "./Quiz.scss";

export default class Quiz extends React.Component {
    public render() {
        return (
            <div className={`elem-quiz`}>
                <div className="top">
                    <Header />
                    <Counter />
                </div>
            </div>
        );
    }
}
