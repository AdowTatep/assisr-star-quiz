import React from "react";
import "./Modal.scss";

interface IModalProps {
    onClose: (event: React.MouseEvent) => void;
}

export default class Modal extends React.Component<IModalProps> {
    public render() {
        return (
            <div className={`ui-modal`} onClick={this.onClose.bind(this)}>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }

    private onClose(event: React.MouseEvent): void {
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }
}
