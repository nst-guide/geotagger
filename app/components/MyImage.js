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
  render() {
    return <img src={this.props.path} alt="Error loading" height={400} />;
  }
}
