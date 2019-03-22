import React from "react";
import { Link } from "react-router-dom";
import IRank from "../../../Interfaces/IRank";
import RankService from "../../../Services/RankService";
import Button from "../../UI/Button/Button";
import "./Finished.scss";

interface IFinishedProps {
    score: number;
    onSubmit: (rank: IRank) => void;
}

interface IFinishedState {
    rank: IRank;
    validation: { valid: boolean; errors: string[]; dirty: boolean };
}

export default class Finished extends React.Component<IFinishedProps, IFinishedState> {
    constructor(props: IFinishedProps) {
        super(props);
        this.state = {
            rank: {
                score: this.props.score,
            },
            validation: {
                valid: true,
                errors: new Array<string>(),
                dirty: false,
            },
        };
    }

    public render() {
        return (
            <div className="elem-finished">
                <h2>
                    <Link to="/">
                        <span className="oi" data-glyph="chevron-left" aria-hidden="true"></span>
                        Finished!
                    </Link>
                </h2>
                <h1 className="score">
                    Your score: {this.props.score}
                </h1>
                {this.getPreviousRank()}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <p>Save your score:</p>
                    {this.state.validation.errors.length > 0 ? this.getErrors(this.state.validation.errors) : null}
                    <div className="field-group">
                        <label>Name: </label>
                        <input
                            name="name"
                            type="text"
                            value={this.state.rank.name}
                            placeholder="Type your name here..."
                            onChange={this.updateForm.bind(this)}
                        ></input>
                    </div>
                    <div className="field-group">
                        <label>Email: </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Type your email here..."
                            value={this.state.rank.email}
                            onChange={this.updateForm.bind(this)}
                        ></input>
                    </div>
                    <div className="actions">
                        <Button type={"submit"} disabled={!this.state.validation.valid && this.state.validation.dirty}>Save</Button>
                    </div>
                </form>
            </div>
        );
    }
    private getPreviousRank(): React.ReactNode {
        const rank = RankService.getPreviousRank();
        if (rank) {
            return (<h4 className="score">Previous score: {rank.score} - {rank.name}</h4>);
        } else {
            return null;
        }
    }
    private getErrors(errors: string[]): React.ReactNode {
        const errorElements = () => errors.map((error, key) => <p key={key}>{error}</p>);
        return (
            <div className="formErrors">
                {errorElements()}
            </div>
        );
    }

    private updateForm(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const name = target.name;

        const rank = { ...this.state.rank, [name]: target.value };

        this.setState({
            rank,
            validation: this.validate(rank, this.state.validation),
        });
    }
    private validate(rank: IRank, validation: { valid: boolean; errors: string[]; dirty: boolean })
        : { valid: boolean; errors: string[]; dirty: boolean; } {
        validation.dirty = true;
        validation.valid = true;
        validation.errors = new Array<string>();

        if (!rank.name || rank.name.length < 3) {
            validation.valid = false;
            validation.errors.push("Name must have at least 3 characters");
        }

        if (!rank.email || !rank.email.match("@")) {
            validation.valid = false;
            validation.errors.push("Field email doesn't contain an email");
        }

        if (!rank.email || rank.email.length < 3) {
            validation.valid = false;
            validation.errors.push("Email must have at least 3 characters");
        }

        return validation;
    }

    private onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.props.onSubmit && this.state.validation.valid && this.state.validation.dirty) {
            this.props.onSubmit(this.state.rank);
        } else if (!this.state.validation.dirty) {
            const validation = this.state.validation;
            validation.errors.push("You must fill the form");
            this.setState({ validation });
        }
    }
}
