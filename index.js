import React from 'react';
import { Image } from 'react-native';

export default class ScalableImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: null,
            height: null,
        }
    }

    componentDidMount() {
        Image.getSize(this.props.source.uri, (width, height) => {
            let ratio;

            if (this.props.width && this.props.height) {
                ratio = Math.min(this.props.width / width, this.props.height / height);
            }
            else if (this.props.width) {
                ratio = this.props.width / width;
            }
            else if (this.props.height) {
                ratio = this.props.height / height;
            }

            this.setState({ width: width * ratio, height: height * ratio });
        }, console.log);
    }

    render() {
        return (
            <Image
                { ...this.props }
                style={[
                    this.props.style,
                    { width: this.state.width, height: this.state.height }
                ]}
            />
        );
    }
}

ScalableImage.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
};