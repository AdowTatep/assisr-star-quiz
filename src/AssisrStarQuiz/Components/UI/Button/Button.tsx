import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

interface IButtonProps {
    content?: string;
    onClick?: (event: React.MouseEvent) => void;
    link?: string;
}

export default class Button extends React.Component<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    public render() {
        if (this.props.link) {
            return (
                <Link className={`ui-button`} to={this.props.link}>
                    {this.props.content}
                </Link>
            );
        } else {
            return (
                <button className={`ui-button`} onClick={this.onClick.bind(this)}>
                    {this.props.content}
                </button>
            );
        }
    }

    private onClick(event: React.MouseEvent): void {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }
}
