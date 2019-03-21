import React from "react";

interface IAsyncImageProps {
    src: string;
}

interface IAsyncImageState {
    loaded: boolean;
    image?: HTMLImageElement;
}

export default class AsyncImage extends React.Component<IAsyncImageProps, IAsyncImageState> {
    constructor(props: IAsyncImageProps) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    public componentDidMount() {
        const image = new Image();

        image.onload = () => {
            this.setState({ loaded: true });
        };

        image.src = this.props.src;

        this.setState({ image });
    }

    public render() {
        return (
            <div className={`elem-asyncImage`}>
                {this.getAsyncImage()}
            </div>
        );
    }

    private getAsyncImage(): React.ReactNode {
        const img = this.state.image;
        if (this.state.loaded && img) {
            return <img
                src={this.props.src} />;
        } else {
            return null;
        }
    }
}
