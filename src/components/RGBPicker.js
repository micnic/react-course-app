import React, { Component } from 'react';
import RangeInput from './RangeInput';
import { redContext, greenContext, blueContext } from './../contextes';

export default class RGBPicker extends Component {

	render() {

		const {
			green, blue, rgb,
			handleChangeGreen,
			handleChangeBlue,
			handleChangeRGB,
			handleBlurRGB
		} = this.props;

		return (
			<React.Fragment>
				<redContext.Consumer>
					{(color) => (
						<RangeInput 
							label="Red" 
							max={255} 
							value={color.value} 
							handler={color.handler}
						/>
					)}
				</redContext.Consumer>
				<RangeInput label="Green" max={255} value={green} handler={handleChangeGreen}/>
				<RangeInput label="Blue" max={255} value={blue} handler={handleChangeBlue}/>
				<br/>RGB:<br/>
				<input type="text" value={rgb} onChange={handleChangeRGB} onBlur={handleBlurRGB}/>
			</React.Fragment>
		);
	}
}