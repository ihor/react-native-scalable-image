import { ImageProps } from 'react-native'
import React, { Component } from 'react'

interface IOnSizeParams {
  width: number,
  height: number,
}

interface IImageProps extends ImageProps {
  height?: number,
  width?: number,
  background?: boolean,
  component?: React.ReactNode,
  onPress?: () => void,
  onSize?: (onSizeParams: IOnSizeParams) => void,
}

export default class Image extends Component<IImageProps> {}