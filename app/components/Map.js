import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import fs from 'fs-extra';

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
    const { geojsonData, viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        mapStyle="https://raw.githubusercontent.com/nst-guide/osm-liberty-topo/gh-pages/style.json"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Source id="my-data" type="geojson" data={geojsonData}>
          <Layer type="circle" />
        </Source>
      </ReactMapGL>
    );
  }
}
