import React, { Component } from 'react';
import { greenContext } from '../contextes';
import RangeInput from './RangeInput';

export default class GreenRangeInput extends Component {
  render() {

    return (
      <greenContext.Consumer>
					{(color) => (
						<RangeInput 
							label="Green" 
							max={255} 
							value={color.value} 
							handler={color.handler}
						/>
					)}
				</greenContext.Consumer>
    );
  } 
}
