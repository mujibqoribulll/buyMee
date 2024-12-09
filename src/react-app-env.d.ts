declare module "*.png";
// declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";


declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-material-ripple' {
  const Ripple: any;
  export default Ripple;
}