import React from 'react';

const redContext = React.createContext();
const greenContext = React.createContext();
const blueContext = React.createContext();

const hueContext = React.createContext();
const saturationContext = React.createContext();
const lightnessContext = React.createContext();

export { 
  redContext, greenContext, blueContext, 
  hueContext, saturationContext, lightnessContext
};
