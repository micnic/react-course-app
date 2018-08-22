import React, { Component } from 'react';
import { lightnessContext } from '../contextes';
import RangeInput from './RangeInput';

export default class LightnessRangeInput extends Component {
  render() {

    return (
      <lightnessContext.Consumer>
					{(lightness) => (
						<RangeInput 
							label="Lightness" 
							max={100} 
							value={lightness.value} 
							handler={lightness.handler}
						/>
					)}
				</lightnessContext.Consumer>
    );
  } 
}
