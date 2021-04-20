import React, {
    useState,
    useEffect,
    useRef
} from 'react';

import PropTypes from 'prop-types';

import {
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

const resolveAssetSource = Image.resolveAssetSource;

const ScalableImage = props => {
    const ImageComponent = props.component
        ? props.component
        : props.background
            ? ImageBackground
            : Image;

    const [scalableWidth, setScalableWidth] = useState(null);
    const [scalableHeight, setScalableHeight] = useState(null);
    const [image, setImage] = useState(null);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        }
    }, []);

    useEffect(() => {
        onProps(props);
    });

    useEffect(() => {
        setImage(
            <ImageComponent
                {...props}
                style={[props.style, {
                    width: scalableWidth,
                    height: scalableHeight
                }]}
            />
        );
    }, [scalableHeight, scalableWidth]);

    const onProps = localProps => {
        const { source } = localProps;
        if (source.uri) {
            const sourceToUse = source.uri
                ? source.uri
                : source;

            Image.getSize(
                sourceToUse,
                (width, height) => adjustSize(width, height, props),
                console.err
            );
        }
        else {
            const sourceToUse = resolveAssetSource(source);
            adjustSize(sourceToUse.width, sourceToUse.height, props);
        }
    };

    const adjustSize = (sourceWidth, sourceHeight, localProps) => {
        const { width, height } = localProps;

        sourceWidth = Math.max(sourceWidth, 1);
        sourceHeight = Math.max(sourceWidth, 1);

        let ratio = 1;

        if (width && height) {
            ratio = Math.min(width / sourceWidth, height / sourceHeight);
        }
        else if (width) {
            ratio = width / sourceWidth;
        }
        else if (height) {
            ratio = height / sourceHeight;
        }

        if (mounted.current) {
            const computedWidth = sourceWidth * ratio;
            const computedHeight = sourceHeight * ratio;

            setScalableWidth(computedWidth);
            setScalableHeight(computedHeight);

            props.onSize({ width: computedWidth, height: computedHeight });
        }
    };

    return !props.onPress ? image : (
      <TouchableOpacity onPress={props.onPress}>
        {image}
      </TouchableOpacity>
    );
};

ScalableImage.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func,
    onSize: PropTypes.func,
    background: PropTypes.bool,
};

ScalableImage.defaultProps = {
    background: false,
    onSize: size => {}
};

export default ScalableImage;
