import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RGBPicker from './components/RGBPicker';
import HSLPicker from './components/HSLPicker';
import { redContext, greenContext, blueContext } from './contextes';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.canvasRef = React.createRef();

    this.state = {
      red: 0,
      green: 0,
      blue: 0,
      hue: 0,
      saturation: 0,
      lightness: 0,
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

    const {
      red, green, blue, rgb,
      hue, saturation, lightness
    } = this.state;

    const style = {
      border: '1px solid black',
      width: '100px',
      height: '100px',
      backgroundColor: rgb
    };

    return (
      <React.Fragment>
        <canvas ref={this.canvasRef} style={{ border: '1px solid black' }} onClick={this.handleClickPalette} width="256" height="256"></canvas>
        <br/>
        <redContext.Provider value={{
          value: red, 
          handler: this.handleChangeRed
        }}>
          <RGBPicker
            green={green}
            blue={blue}
            rgb={rgb}
            handleChangeGreen={this.handleChangeGreen}
            handleChangeBlue={this.handleChangeBlue}
            handleChangeRGB={this.handleChangeRGB}
            handleBlurRGB={this.handleBlurRGB}
          />
        </redContext.Provider>
        <hr/>
        <HSLPicker
          hue={hue}
          saturation={saturation}
          lightness={lightness}
          handleChangeHue={this.handleChangeHue}
          handleChangeSaturation={this.handleChangeSaturation}
          handleChangeLightness={this.handleChangeLightness}
        />
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
    const [ hue, saturation, lightness ] = App.toHSL(red, green, blue);

    this.setState({
      red,
      green,
      blue,
      hue,
      saturation,
      lightness,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeRed = (event) => {

    const red = Number(event.target.value);
    const { green, blue } = this.state;

    const [ hue, saturation, lightness ] = App.toHSL(red, green, blue);

    this.setState({
      red,
      hue,
      saturation,
      lightness,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeGreen = (event) => {

    const green = Number(event.target.value);
    const { red, blue } = this.state;

    const [ hue, saturation, lightness ] = App.toHSL(red, green, blue);

    this.setState({
      green,
      hue,
      saturation,
      lightness,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeBlue = (event) => {

    const blue = Number(event.target.value);
    const { red, green } = this.state;

    const [ hue, saturation, lightness ] = App.toHSL(red, green, blue);

    this.setState({
      blue,
      hue,
      saturation,
      lightness,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeHue = (event) => {

    const hue = Number(event.target.value);
    const { saturation, lightness } = this.state;

    const [ red, green, blue ] = App.toRGB(hue / 360, saturation / 100, lightness / 100);

    this.setState({
      hue,
      red,
      green,
      blue,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeSaturation = (event) => {

    const saturation = Number(event.target.value);
    const { hue, lightness } = this.state;

    const [ red, green, blue ] = App.toRGB(hue / 360, saturation / 100, lightness / 100);

    this.setState({
      saturation,
      red,
      green,
      blue,
      rgb: App.getRGB(red, green, blue)
    });
  }

  handleChangeLightness = (event) => {

    const lightness = Number(event.target.value);
    const { hue, saturation } = this.state;

    const [ red, green, blue ] = App.toRGB(hue / 360, saturation / 100, lightness / 100);

    this.setState({
      lightness,
      red,
      green,
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

    const [ hue, saturation, lightness ] = App.toHSL(red, green, blue);

    this.setState({
      red,
      green,
      blue,
      hue,
      saturation,
      lightness,
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

  static toHSL(red, green, blue) {

    red /= 255;
    green /= 255; 
    blue /= 255;

    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue);

    let hue = 0;
    let saturation = 0;
    let lightness = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case red: hue = (green - blue) / d + (green < blue ? 6 : 0); break;
        case green: hue = (blue - red) / d + 2; break;
        case blue: hue = (red - green) / d + 4; break;
        default: break;
      }

      hue /= 6;
    }

    return [ hue * 360, saturation * 100, lightness * 100 ];
  }

  static toRGB(hue, saturation, lightness) {

    let red = lightness;
    let green = lightness;
    let blue = lightness;

    if (saturation !== 0) {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
      var p = 2 * lightness - q;

      red = hue2rgb(p, q, hue + 1/3);
      green = hue2rgb(p, q, hue);
      blue = hue2rgb(p, q, hue - 1/3);
    }

    return [
      Math.round(red * 255),
      Math.round(green * 255),
      Math.round(blue * 255)
    ];
  }
}
