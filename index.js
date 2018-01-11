import React from 'react'
import PropTypes from 'prop-types'
import {Image, TouchableOpacity} from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

export default class ScalableImage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			width : null,
			height: null,
		}

		this.mounted = false

		this.computeAndSetRatio = this.computeAndSetRatio.bind(this)
	}

	componentWillUnmount() {
		this.mounted = false
	}

	componentDidMount() {
		this.mounted = true
		this._imageChanged(this.props)
	}

	_imageChanged(props) {
		if (props.source.uri) {
			Image.getSize(props.source.uri ? props.source.uri : props.source, (width, height) => this.computeAndSetRatio(width, height, props), console.log)
		}
		else {
			const source = resolveAssetSource(props.source)
			this.computeAndSetRatio(source.width, source.height, props)
		}
	}

	componentWillReceiveProps(nextProps) {
		this._imageChanged(nextProps)
	}

	computeAndSetRatio(width, height, props) {
		const maxWidth = props.maxWidth ? props.maxWidth : Number.MAX_VALUE
		const maxHeight = props.maxHeight ? props.maxHeight : Number.MAX_VALUE

		let ratio = 1

		if (props.width && props.height) {
			ratio = Math.min(props.width / width, props.height / height)
		}
		else if (props.width) {
			ratio = props.width / width
		}
		else if (props.height) {
			ratio = props.height / height
		}

		// consider max width
		if (width * ratio > maxWidth) {
			ratio = (maxWidth * ratio) / (width * ratio)
		}
		// consider max height
		if (height * ratio > maxHeight) {
			ratio = (maxHeight * ratio) / (height * ratio)
		}

		if (this.mounted) {
			this.setState({width: width * ratio, height: height * ratio})
		}
	}

	render() {
		if (this.props.onPress) {
			return (
				<TouchableOpacity onPress={this.props.onPress}>
					<Image
						{...this.props}
						style={[
							this.props.style,
							{width: this.state.width, height: this.state.height}
						]}
					/>
				</TouchableOpacity>
			)
		}
		else {
			return (
				<Image
					{...this.props}
					style={[
						this.props.style,
						{width: this.state.width, height: this.state.height}
					]}
				/>
			)
		}
	}

}

ScalableImage.propTypes = {
	width    : PropTypes.number,
	height   : PropTypes.number,
	maxWidth : PropTypes.number,
	maxHeight: PropTypes.number,
	onPress  : PropTypes.func,
}
