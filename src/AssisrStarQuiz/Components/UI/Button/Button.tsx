import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

interface IButtonProps {
    onClick?: (event: React.MouseEvent) => void;
    link?: string;
    disabled?: boolean;
    type?: string;
}

export default class Button extends React.Component<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    public render() {
        if (this.props.link) {
            return (
                <Link className={`ui-button`} to={this.props.link}>
                    {this.props.children}
                </Link>
            );
        } else {
            return (
                <button className={`ui-button`} type={this.props.type} onClick={this.onClick.bind(this)} disabled={this.props.disabled}>
                    {this.props.children}
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
