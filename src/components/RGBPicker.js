import React, { Component } from 'react';
import RedRangeInput from './RedRangeInput';
import GreenRangeInput from './GreenRangeInput';
import BlueRangeInput from './BlueRangeInput';
import { Link } from 'react-router-dom';

export default class RGBPicker extends Component {

	render() {

		const {
			rgb,
			handleChangeRGB,
			handleBlurRGB
		} = this.props;

		if (rgb === '#ffffff') {
			throw new Error('I dont know what happened');
		}

		return (
			<React.Fragment>
				<Link to="/hsl">Go to HSL</Link>
				<RedRangeInput/>
				<GreenRangeInput/>
				<BlueRangeInput/>
				<br/>RGB:<br/>
				<input type="text" value={rgb} onChange={handleChangeRGB} onBlur={handleBlurRGB}/>
			</React.Fragment>
		);
	}
}