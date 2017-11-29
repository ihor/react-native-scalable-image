import React from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

export default class ScalableImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: null,
            height: null,
        };

        this.mounted = false;

        this.computeAndSetRatio = this.computeAndSetRatio.bind(this);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        if (this.props.source.uri) {
            Image.getSize(this.props.source.uri ? this.props.source.uri : this.props.source, this.computeAndSetRatio, console.log);
        }
        else {
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

        if (this.mounted) {
            this.setState({width: width * ratio, height: height * ratio});
        }
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
        } else if (this.props.background) {
          <ImageBackground
              { ...this.props }
              style={[
                  this.props.style,
                  {width: this.state.width, height: this.state.height}
              ]}
          />
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

ScalableImage.defaultProps = {
  background: false
}

ScalableImage.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    onPress: PropTypes.func,
    background: PropTypes.bool
};
