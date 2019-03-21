import React from "react";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import AsyncImage from "../AsyncImage/AsyncImage";
import "./Character.scss";

interface ICharacterProps {

}

interface ICharacterState {
    isModalOpenned: boolean;
}

export default class Character extends React.Component<ICharacterProps, ICharacterState> {
    constructor(props: ICharacterProps) {
        super(props);
        this.state = {
            isModalOpenned: false,
        };
    }
    public render() {
        return (
            <div className={`elem-character`}>
                <div className="image">

                </div>
                <div className="actions">
                    <input placeholder="Character name..." />
                    <Button content={"..."} onClick={this.openTip.bind(this)} />
                </div>
                {this.state.isModalOpenned ? <Modal onClose={() => this.closeTip()}>{this.getTip()}</Modal> : null}
            </div>
        );
    }

    public getTip() {
        return (<div>aaaaaa</div>);
    }

    public openTip() {
        this.setState({ isModalOpenned: true });
    }

    public closeTip() {
        this.setState({ isModalOpenned: false });
    }
}
