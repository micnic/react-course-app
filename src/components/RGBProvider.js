import React, { Component } from 'react';
import { redContext, greenContext, blueContext } from '../contextes';

export default class RGBProvider extends Component {

  render() {
    const {
      red, green, blue,
      children
    } = this.props;
    return (
      <redContext.Provider value={red}>
          <greenContext.Provider value={green}>
            <blueContext.Provider value={blue}>
              { children }
            </blueContext.Provider>
          </greenContext.Provider>
        </redContext.Provider>      
    );
  }
}
