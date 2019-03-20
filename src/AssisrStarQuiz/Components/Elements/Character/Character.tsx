import React from "react";
import Button from "../../UI/Button/Button";
import "./Character.scss";

export default class Character extends React.Component {
    public render() {
        return (
            <div className={`elem-character`}>

                <div className="actions">
                    <input />
                    <Button />
                </div>
            </div>
        );
    }
}
