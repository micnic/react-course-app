import React, { Component } from 'react';
import { hueContext } from '../contextes';
import RangeInput from './RangeInput';

export default class HueRangeInput extends Component {
  render() {

    return (
      <hueContext.Consumer>
					{(hue) => (
						<RangeInput 
							label="Hue" 
							max={360} 
							value={hue.value} 
							handler={hue.handler}
						/>
					)}
				</hueContext.Consumer>
    );
  } 
}
