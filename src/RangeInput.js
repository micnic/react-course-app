import React, { Component } from 'react';

export default class RangeInput extends Component {

  render() {

    const { label, max, value, handler } = this.props;

    return (
      <React.Fragment>
        <br/>{label}:<br/>
        <input type="range" min="0" max={max} value={value} onChange={handler}/>
      </React.Fragment>
    );
  }
}