import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import Select from 'react-select';
import fs from 'fs-extra';

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

const hmFolder =
  '/Users/kyle/github/mapping/nst-guide/create-database/data/pct/line/halfmile/';
const hmFiles = [
  'CA_Sec_A_tracks.geojson',
  'CA_Sec_B_tracks.geojson',
  'CA_Sec_C_tracks.geojson',
  'CA_Sec_D_tracks.geojson',
  'CA_Sec_E_tracks.geojson',
  'CA_Sec_F_tracks.geojson',
  'CA_Sec_G_tracks.geojson',
  'CA_Sec_H_tracks.geojson',
  'CA_Sec_I_tracks.geojson',
  'CA_Sec_J_tracks.geojson',
  'CA_Sec_K_tracks.geojson',
  'CA_Sec_L_tracks.geojson',
  'CA_Sec_M_tracks.geojson',
  'CA_Sec_N_tracks.geojson',
  'CA_Sec_O_tracks.geojson',
  'CA_Sec_P_tracks.geojson',
  'CA_Sec_Q_tracks.geojson',
  'CA_Sec_R_tracks.geojson',
  'OR_Sec_B_tracks.geojson',
  'OR_Sec_C_tracks.geojson',
  'OR_Sec_D_tracks.geojson',
  'OR_Sec_E_tracks.geojson',
  'OR_Sec_F_tracks.geojson',
  'OR_Sec_G_tracks.geojson',
  'WA_Sec_H_tracks.geojson',
  'WA_Sec_I_tracks.geojson',
  'WA_Sec_J_tracks.geojson',
  'WA_Sec_K_tracks.geojson',
  'WA_Sec_L_tracks.geojson'
];

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 600,
        height: 600,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      mapStyle: mapStyleOptions[0],
      hmGeojsons: []
    };
  }

  componentDidMount() {
    for (const geojsonStub of hmFiles) {
      const path = hmFolder + geojsonStub;
      console.log(path);
      fs.readJSON(path)
        .then(data => {
          this.setState(prevState => ({
            hmGeojsons: [...prevState.hmGeojsons, data]
          }));
        })
        .catch(err => console.err(err));
    }
  }

  handleChange = mapStyle => {
    this.setState({ mapStyle });
  };

  render() {
    const { viewport, mapStyle, hmGeojsons } = this.state;
    const { geojsonData, onClick } = this.props;
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
          onClick={onClick}
        >
          {hmGeojsons !== [] &&
            hmGeojsons.map((object, i) => (
              <Source
                // key={`source_${i}`}
                id={`map_${i}`}
                type="geojson"
                data={object}
              >
                <Layer
                  // key={`layer_${i}`}
                  type="line"
                  paint={{ 'line-color': '#ff0000', 'line-width': 2 }}
                />
              </Source>
            ))}
          <Source id="my-data" type="geojson" data={geojsonData}>
            <Layer type="circle" />
          </Source>
        </ReactMapGL>
      </div>
    );
  }
}
