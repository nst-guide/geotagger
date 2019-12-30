import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
// var electron = require('electron');
// // var electron = window.require("electron");
const fs = require('fs-extra');

// import fs from "fs";

require('dotenv').config();

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geojsonData: null,
      viewport: {
        width: 600,
        height: 600,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
  }

  componentDidMount() {
    const filePath =
      '/Users/kyle/github/mapping/nst-guide/create-database/nst-guide-web-photos.geojson';
    fs.readJSON(filePath).then(data => {
      return this.setState({ geojsonData: data });
    });
  }

  render() {
    const { geojsonData } = this.state;
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Source id="my-data" type="geojson" data={geojsonData}>
          <Layer type="circle" />
        </Source>
      </ReactMapGL>
    );
  }
}
