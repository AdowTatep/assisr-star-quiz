import React from "react";
import Button from "../../UI/Button";
import { ReactComponent as DarthSVG } from "./../../../Static/Svg/darth.svg";
import "./Menu.scss";

interface IMenuProps {
    onStartClick?: (event: React.MouseEvent) => void;
}

export default class Menu extends React.Component<IMenuProps> {
    constructor(props: IMenuProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`elem-menu`}>
                <DarthSVG />
                <div>
                    <h1 className={`font-starJediSe`}>Star quiz</h1>
                    <p>Do you like star wars? Test yourself with this quiz!</p>
                    <ul>
                        <p>You have 2 minutes to correctly answer character names from star wars</p>
                        <li>Score 10 points if you answer without reading the tip</li>
                        <li>Score 5 points if you answer with the tip</li>
                    </ul>
                </div>
                <Button content={"Start Game!"} onClick={this.start.bind(this)} />
            </div>
        );
    }

    private start(event: React.MouseEvent): void {
        if (this.props.onStartClick) {
            this.props.onStartClick(event);
        }
    }
}