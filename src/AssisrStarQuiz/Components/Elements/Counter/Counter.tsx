import moment from "moment";
import React from "react";
import "./Counter.scss";

interface ICounterProps {
    limitInSeconds: number;
    onLimit: () => void;
}

interface ICounterState {
    time: string;
}

export default class Counter extends React.Component<ICounterProps, ICounterState> {
    constructor(props: ICounterProps) {
        super(props);
        this.state = {
            time: "00:00",
        };
    }

    public componentDidMount() {
        let totalSeconds = 0;
        const interval = setInterval(() => {
            const duration = moment.duration(totalSeconds, "seconds");

            // If time has reached, stop
            if (duration.asSeconds() > this.props.limitInSeconds) {
                clearInterval(interval);
                if (this.props.onLimit) {
                    this.props.onLimit();
                }
            } else {
                // Add one second each second
                totalSeconds++;

                // Format the moment and update ui
                const minutes = duration.minutes();
                const seconds = duration.seconds();
                const time = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
                this.setState({ time });
            }
        }, 1000);
    }

    public render() {
        return (
            <div className={`elem-counter`}>
                <h1>{this.state.time}</h1>
            </div>
        );
    }
}
