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
            totalSeconds = this.tickCounter(totalSeconds, interval);
        }, 1000);
        totalSeconds = this.tickCounter(totalSeconds, interval);
    }

    public render() {
        return (
            <div className={`elem-counter`}>
                <h1>
                    <span className="oi" data-glyph="timer" aria-hidden="true"></span>
                    {this.state.time}
                </h1>
            </div>
        );
    }

    private tickCounter(totalSeconds: number, interval: NodeJS.Timeout) {
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
        return totalSeconds;
    }
}
