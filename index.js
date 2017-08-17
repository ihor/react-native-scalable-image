import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

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

            if (width * ratio > this.props.maxWidth) {
                ratio = this.props.maxWidth * ratio / (width * ratio);
            }

            if (height * ratio > maxHeight) {
                ratio = this.props.maxHeight * ratio / (height * ratio);
            }

            this.setState({ width: width * ratio, height: height * ratio });
        }, console.log);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image
                    { ...this.props }
                    style={[
                        this.props.style,
                        { width: this.state.width, height: this.state.height }
                    ]}
                />
            </TouchableOpacity>
        );
    }
}

ScalableImage.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    maxWidth: React.PropTypes.number,
    maxHeight: React.PropTypes.number,
    onPress: React.PropTypes.func,
};

ScalableImage.defaultProps = {
    maxWidth: Number.MAX_VALUE,
    maxHeight: Number.MAX_VALUE,
};