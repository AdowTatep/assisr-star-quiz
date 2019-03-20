import React from "react";
import { ReactComponent as DarthSVG } from "./../../../Static/Svg/darth.svg";
import "./Header.scss";

interface IHeaderProps {
    scale?: boolean;
    vertical?: boolean;
}

export default class Header extends React.Component<IHeaderProps> {
    constructor(props: IHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <div className={`ui-header ${this.props.vertical ? "vertical" : ""}`}>
                <DarthSVG className={this.props.scale ? "scaled" : ""} />
                <h1 className={`font-starJediSe ${!this.props.vertical ? "horizontal" : ""}`}>Star quiz</h1>
            </div>
        );
    }
}
