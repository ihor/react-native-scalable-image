import { ImageProps } from 'react-native'
import { Component } from 'react'

interface IOnSizeParams {
  width: number,
  height: number,
}

interface IImageProps extends ImageProps {
  height?: number,
  width?: number,
  background?: boolean,
  onPress?: () => void,
  onSize?: (onSizeParams: IOnSizeParams) => void,
}

export default class Image extends Component<IImageProps> {}