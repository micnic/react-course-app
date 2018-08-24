import React, { Component } from 'react';
import { hueContext, saturationContext, lightnessContext } from '../contextes';

export default class HSLProvider extends Component {

  render() {
    const {
      hue, saturation, lightness,
      children
    } = this.props;
    return (
      <hueContext.Provider value={hue}>
          <saturationContext.Provider value={saturation}>
            <lightnessContext.Provider value={lightness}>
              { children }
            </lightnessContext.Provider>
          </saturationContext.Provider>
        </hueContext.Provider>
    );
  }
}
