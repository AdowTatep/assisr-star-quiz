import React from "react";
import "./Button.scss";

interface IButtonProps {
    content?: string;
    onClick?: (event: React.MouseEvent) => void;
}

export default class Button extends React.Component<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    public render() {
        return (
            <button className={`ui-button`} onClick={this.onClick.bind(this)}>
                {this.props.content}
            </button>
        );
    }

    private onClick(event: React.MouseEvent): void {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }
}
