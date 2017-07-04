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

        const  maxWidth = this.props.maxWidth?this.props.maxWidth:Number.MAX_VALUE;
        const  maxHeight = this.props.maxHeight?this.props.maxHeight:Number.MAX_VALUE;


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


        // cosider max width
        if (width * ratio > maxWidth) {
            ratio = (maxWidth * ratio) / (width * ratio);
        }
        // consider max height
        if (height * ratio > maxHeight) {
            ratio = (maxHeight * ratio) / (height * ratio);
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