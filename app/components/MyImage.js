import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import fs from 'fs-extra';
import Select from 'react-select';
import execa from 'execa';

// (async () => {
//   const { stdout } = await execa('echo', ['unicorns']);
//   console.log(stdout);
//   //=> 'unicorns'
// })();

export default class Map extends React.Component {
  convertImage = imagePath => {

  }


  render() {
    const {path} = this.props;
    return <img src={path} alt="Error loading" height={400} />;
  }
}
