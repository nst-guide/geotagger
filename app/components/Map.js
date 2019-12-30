import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import fs from 'fs-extra';
import Select from 'react-select';

require('dotenv').config();

const mapStyleOptions = [
  {
    value:
      'https://raw.githubusercontent.com/nst-guide/osm-liberty-topo/gh-pages/style.json',
    label: 'OSM Liberty Topo'
  },
  { value: 'mapbox://styles/mapbox/outdoors-v11', label: 'Mapbox Outdoors' },
  {
    value: 'mapbox://styles/mapbox/satellite-streets-v11',
    label: 'Mapbox Satellite Streets'
  }
];

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
      },
      mapStyle: mapStyleOptions[0]
    };
  }

  componentDidMount() {
    const filePath =
      '/Users/kyle/github/mapping/nst-guide/create-database/nst-guide-web-photos.geojson';
    fs.readJSON(filePath).then(data => {
      return this.setState({ geojsonData: data });
    });
  }

  handleChange = mapStyle => {
    this.setState({ mapStyle }, () =>
      console.log(`Option selected:`, this.state.mapStyle)
    );
  };

  render() {
    const { geojsonData, viewport, mapStyle } = this.state;
    return (
      <div>
        <Select
          value={mapStyle}
          onChange={this.handleChange}
          options={mapStyleOptions}
        />
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
          mapStyle={mapStyle.value}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          <Source id="my-data" type="geojson" data={geojsonData}>
            <Layer type="circle" />
          </Source>
        </ReactMapGL>
      </div>
    );
  }
}
