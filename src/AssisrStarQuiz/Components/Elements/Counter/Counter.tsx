import React from "react";
import "./Counter.scss";

export default class Counter extends React.Component {
    public render() {
        return (
            <div className={`elem-counter`}>
                <h1>00:00</h1>
            </div>
        );
    }
}
