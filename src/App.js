import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.canvasRef = React.createRef();

    this.state = {
      red: 0,
      green: 0,
      blue: 0,
      rgb: '#000000'
    };
  }

  componentDidMount() {

    const canvas = ReactDOM.findDOMNode(this.canvasRef.current);
    const context = canvas.getContext('2d');

    const width = 256;
    const height = 256;

    let gradient = context.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(0,    "rgb(255,   0,   0)");
    gradient.addColorStop(0.15, "rgb(255,   0, 255)");
    gradient.addColorStop(0.33, "rgb(0,     0, 255)");
    gradient.addColorStop(0.49, "rgb(0,   255, 255)");
    gradient.addColorStop(0.67, "rgb(0,   255,   0)");
    gradient.addColorStop(0.84, "rgb(255, 255,   0)");
    gradient.addColorStop(1,    "rgb(255,   0,   0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
    gradient.addColorStop(1, "rgba(0,     0,   0, 1)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  render() {

    const { red, green, blue, rgb } = this.state;

    const style = {
      border: '1px solid black',
      width: '100px',
      height: '100px',
      backgroundColor: rgb
    };

    return (
      <React.Fragment>
        <canvas ref={this.canvasRef} style={{ border: '1px solid black' }} onMouseMove={this.handleClickPalette} width="256" height="256"></canvas>
        <br/>Red:<br/>
        <input type="range" min="0" max="255" value={red} onChange={this.handleChangeRed}/>
        <br/>Green:<br/>
        <input type="range" min="0" max="255" value={green} onChange={this.handleChangeGreen}/>
        <br/>Blue:<br/>
        <input type="range" min="0" max="255" value={blue} onChange={this.handleChangeBlue}/>
        <br/>RGB:<br/>
        <input type="text" value={rgb} onChange={this.handleChangeRGB} onBlur={this.handleBlurRGB}/>
        <br/>
        <div style={style}></div>
      </React.Fragment>
    );
  }

  handleClickPalette = (event) => {

    const x = event.pageX - 1;
    const y = event.pageY - 1;

    const canvas = ReactDOM.findDOMNode(this.canvasRef.current);
    const context = canvas.getContext('2d');

    const imageData = context.getImageData(x, y, 1, 1);

    const [ red, green, blue ] = imageData.data;

    this.setState({
      red,
      green,
      blue,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeRed = (event) => {

    const red = Number(event.target.value);
    const { green, blue } = this.state;

    this.setState({
      red,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeGreen = (event) => {

    const green = Number(event.target.value);
    const { red, blue } = this.state;

    this.setState({
      green,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeBlue = (event) => {

    const blue = Number(event.target.value);
    const { red, green } = this.state;

    this.setState({
      blue,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeRGB = (event) => {

    let value = event.target.value;
    const values = value.slice(1);                // without #
    let red = parseInt(values.slice(0, 2), 16);   // XX____
    let green = parseInt(values.slice(2, 4), 16); // __XX__
    let blue = parseInt(values.slice(4, 6), 16);  // ____XX

    if (Number.isNaN(red)) {
      red = 0;
    }

    if (Number.isNaN(green)) {
      green = 0;
    }

    if (Number.isNaN(blue)) {
      blue = 0;
    }

    if (!/^#[\da-f]{0,6}$/i.test(value)) {
      value = this.state.rgb;
    }

    this.setState({
      red,
      green,
      blue,
      rgb: value
    });
  }

  handleBlurRGB = () => {

    const { red, green, blue } = this.state;

    this.setState({
      rgb: App.getRGB(red, green, blue)
    });
  }

  static toHex(value) {

    return value.toString(16).padStart(2, '0');
  }

  static getRGB(red, green, blue) {

    return `#${App.toHex(red)}${App.toHex(green)}${App.toHex(blue)}`;
  }
}
