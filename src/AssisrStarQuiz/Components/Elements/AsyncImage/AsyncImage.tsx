import React from "react";
import "./AsyncImage.scss";

interface IAsyncImageProps {
    src: string;
    loader?: React.ReactElement;
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

        // When the image downloads, set "loaded" to true
        // so it will refresh on screen
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

        // Only display image if it has loaded
        if (this.state.loaded && img) {
            return <img
                src={this.props.src} />;
        } else if (img && !this.state.loaded && this.props.loader) {
            return this.props.loader;
        } else {
            return null;
        }
    }
}
