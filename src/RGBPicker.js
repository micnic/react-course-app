import React, { Component } from 'react';
import RangeInput from './RangeInput';

export default class RGBPicker extends Component {

	render() {

		const {
			red, green, blue, rgb,
			handleChangeRed,
			handleChangeGreen,
			handleChangeBlue,
			handleChangeRGB,
			handleBlurRGB
		} = this.props;

		return (
			<React.Fragment>
				<RangeInput label="Red" max={255} value={red} handler={handleChangeRed}/>
				<RangeInput label="Green" max={255} value={green} handler={handleChangeGreen}/>
				<RangeInput label="Blue" max={255} value={blue} handler={handleChangeBlue}/>
				<br/>RGB:<br/>
				<input type="text" value={rgb} onChange={handleChangeRGB} onBlur={handleBlurRGB}/>
			</React.Fragment>
		);
	}
}