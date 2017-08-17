React Native Scalable Image
===========================
React Native ```<Image/>``` component which scales width or height automatically to keep the aspect ratio. Is useful when you need to display an entire network image but don't know its size and can limit it only by width or height.

The following example creates an image which fits the full screen width and maximum height of 300:

 ```jsx
import React from 'react';
import { Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';

const image = <Image width={Dimensions.get('window').width} maxHeight={300} source={{uri: '<image uri>'}} />;
 ```


Install
=======
```npm install react-native-scalable-image --save```


Usage
=====

Specify width or height which may be calculated dynamically like in the example above. All other props are the same as in regular [React Native ```<Image/>``` component](https://facebook.github.io/react-native/docs/image.html).

## props

| name          | type      | default                     | description             |
| ------------- | --------- | --------------------------- | ----------------------- |
| `height`      | number    | calculated dynamically      | image height            |
| `width`       | number    | calculated dynamically      | image width             |
| `maxHeight`   | number    | Number.MAX_VALUE            | maximum image height    |
| `maxWidth`    | number    | Number.MAX_VALUE            | maximum image width     |