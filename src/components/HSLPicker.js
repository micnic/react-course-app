import React, { Component } from 'react';
import { hueContext, saturationContext, lightnessContext } from '../contextes';
import HueRangeInput from './HueRangeInput';
import SaturationRangeInput from './SaturationRangeInput';
import LightnessRangeInput from './LightnessRangeInput';
import { Link } from 'react-router-dom';

export default class HSLPicker extends Component {

	render() {

		return (
			<React.Fragment>
				<Link to="/rgb">Go to RGB</Link>
				<HueRangeInput/>
				<SaturationRangeInput/>
				<LightnessRangeInput/>
				<br/>

				<div>HSL(
					<hueContext.Consumer>
						{hue => Math.round(hue.value)}
					</hueContext.Consumer>
					,&nbsp;
					<saturationContext.Consumer>
						{saturation => `${saturation.value.toFixed(2)}%`}
					</saturationContext.Consumer>
					,&nbsp;
					<lightnessContext.Consumer>
						{lightness => `${lightness.value.toFixed(2)}%`}
					</lightnessContext.Consumer>
				)</div>
			</React.Fragment>
		);
	}
}