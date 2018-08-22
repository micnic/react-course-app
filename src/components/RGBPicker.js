import React, { Component } from 'react';
import RedRangeInput from './RedRangeInput';
import GreenRangeInput from './GreenRangeInput';
import BlueRangeInput from './BlueRangeInput';

export default class RGBPicker extends Component {

	render() {

		const {
			rgb,
			handleChangeRGB,
			handleBlurRGB
		} = this.props;

		return (
			<React.Fragment>
				<RedRangeInput/>
				<GreenRangeInput/>
				<BlueRangeInput/>
				<br/>RGB:<br/>
				<input type="text" value={rgb} onChange={handleChangeRGB} onBlur={handleBlurRGB}/>
			</React.Fragment>
		);
	}
}