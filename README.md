React Native Scalable Image
===========================
React Native ```<Image/>``` component [does not keep the image aspect ratio](https://github.com/facebook/react-native/issues/858), which results in the image being stretched or cropped. ```react-native-scalable-image``` solves this problem by calculating the image size and resizing the image when rendering.

This library provides an ```<Image/>``` component which scales width or height automatically to keep the aspect ratio. It is useful when you don't know the aspect ratio in advance (e.g. user-uploaded content) but want to display the entire image and limit it only by width or height to fit the container component.

The following example creates an image which fits the full screen width and keeps the aspect ratio:

 ```jsx
import React from 'react';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';

const image = (
    <Image
        width={Dimensions.get('window').width} // height will be calculated automatically
        source={{uri: '<image uri>'}}
    />
);
 ```


Install
=======
```npm install react-native-scalable-image --save```


Usage
=====

Specify width or height which may be calculated dynamically like in the example above. All other props are the same as in regular [React Native ```<Image/>``` component](https://facebook.github.io/react-native/docs/image.html).

## props

| name          | type      | default                     | description                                                               |
| ------------- | --------- | --------------------------- | --------------------------------------------------------------------------|
| `height`      | number    | none                        | Maximum image height                                                      |
| `width`       | number    | none                        | Maximum image width                                                       |
| `background`  | boolean   | false                       | Set to true when used as a background                                     |
| `onPress`     | function  | none                        | onPress callback                                                          |
| `onSize`      | function  | none                        | Is called with ```{ width, height }``` as the first arg once image size is calculated |

Versions
========
The latest major version of `react-native-scalable-image` is implemented with hooks. If you are using a pre-hooks React version please use `react-native-scalable-image` version `0.5.1`

| React Version | Scalable Image Version |
| ------------- | ---------------------- |
|  < 16.8       |   0.5.1                |
| >= 16.8       | > 1.0.0                |
