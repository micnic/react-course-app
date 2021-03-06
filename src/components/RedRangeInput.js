import React, { Component } from 'react';
import { redContext } from '../contextes';
import RangeInput from './RangeInput';

export default class RedRangeInput extends Component {
  render() {

    return (
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
    );
  } 
}
