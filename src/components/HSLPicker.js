import React, { Component } from 'react';
import RangeInput from './RangeInput';

export default class HSLPicker extends Component {

	render() {

		const {
			hue,
			saturation,
			lightness,
			handleChangeHue,
			handleChangeSaturation,
			handleChangeLightness
		} = this.props;

		return (
			<React.Fragment>
				<RangeInput 
					label="Hue" 
					max={360} 
					value={hue} 
					handler={handleChangeHue}
				/>
				<RangeInput 
					label="Saturation" 
					max={100} 
					value={saturation} 
					handler={handleChangeSaturation}
				/>
				<RangeInput 
					label="Lightness" 
					max={100} 
					value={lightness} 
					handler={handleChangeLightness}
				/>
				<br/>
				<div>HSL(
					{Math.round(hue)}, 
					{saturation.toFixed(2)}%, 
					{lightness.toFixed(2)}%)
				</div>
			</React.Fragment>
		);
	}
}