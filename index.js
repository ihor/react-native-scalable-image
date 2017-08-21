import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

export default class ScalableImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: null,
            height: null,
        };

        this.computeAndSetRatio = this.computeAndSetRatio.bind(this);
    }

    componentDidMount() {

        if (this.props.source.uri) {
            Image.getSize(this.props.source.uri ? this.props.source.uri : this.props.source, this.computeAndSetRatio, console.log);
        } else {
            const source = resolveAssetSource(this.props.source);
            this.computeAndSetRatio(source.width, source.height);
        }
    }

    computeAndSetRatio(width, height) {
        const maxWidth = this.props.maxWidth ? this.props.maxWidth : Number.MAX_VALUE;
        const maxHeight = this.props.maxHeight ? this.props.maxHeight : Number.MAX_VALUE;

        let ratio = 1;

        if (this.props.width && this.props.height) {
            ratio = Math.min(this.props.width / width, this.props.height / height);
        }
        else if (this.props.width) {
            ratio = this.props.width / width;
        }
        else if (this.props.height) {
            ratio = this.props.height / height;
        }


        // consider max width
        if (width * ratio > maxWidth) {
            ratio = (maxWidth * ratio) / (width * ratio);
        }
        // consider max height
        if (height * ratio > maxHeight) {
            ratio = (maxHeight * ratio) / (height * ratio);
        }

        this.setState({width: width * ratio, height: height * ratio});
    }

    render() {
        if (this.props.onPress) {
            return (
                <TouchableOpacity onPress={this.props.onPress}>
                    <Image
                        { ...this.props }
                        style={[
                            this.props.style,
                            {width: this.state.width, height: this.state.height}
                        ]}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <Image
                    { ...this.props }
                    style={[
                        this.props.style,
                        {width: this.state.width, height: this.state.height}
                    ]}
                />
            )
        }
    }

}

ScalableImage
    .propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    maxWidth: React.PropTypes.number,
    maxHeight: React.PropTypes.number,
    onPress: React.PropTypes.func,
};