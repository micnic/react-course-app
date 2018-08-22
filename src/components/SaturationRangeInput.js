import React, { Component } from 'react';
import { saturationContext } from '../contextes';
import RangeInput from './RangeInput';

export default class SaturationRangeInput extends Component {
  render() {

    return (
      <saturationContext.Consumer>
					{(saturation) => (
						<RangeInput 
							label="Saturation" 
							max={100} 
							value={saturation.value} 
							handler={saturation.handler}
						/>
					)}
				</saturationContext.Consumer>
    );
  } 
}
