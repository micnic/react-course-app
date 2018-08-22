import React, { Component } from 'react';
import { blueContext } from '../contextes';
import RangeInput from './RangeInput';

export default class BlueRangeInput extends Component {
  render() {

    return (
      <blueContext.Consumer>
					{(color) => (
						<RangeInput 
							label="Blue" 
							max={255} 
							value={color.value} 
							handler={color.handler}
						/>
					)}
				</blueContext.Consumer>
    );
  } 
}
