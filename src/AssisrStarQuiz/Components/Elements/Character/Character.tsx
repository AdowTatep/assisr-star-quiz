import React from "react";
import Button from "../../UI/Button/Button";
import AsyncImage from "../AsyncImage/AsyncImage";
import "./Character.scss";

export default class Character extends React.Component {
    public render() {
        return (
            <div className={`elem-character`}>
                <div className="image">

                </div>
                <div className="actions">
                    <input placeholder="Character name..." />
                    <Button content={"..."} />
                </div>
            </div>
        );
    }
}
