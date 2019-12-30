import React, { Component } from 'react';
import fs from 'fs-extra';
import styles from './Home.css';
import Map from './Map';
import MyImage from './MyImage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosGeojson: null,
      selectedIndex: null
    };
  }

  componentDidMount() {
    const filePath =
      '/Users/kyle/github/mapping/nst-guide/create-database/photos.json';
    fs.readJSON(filePath)
      .then(data => {
        return this.setState({ photosGeojson: data });
      })
      .catch(err => console.err(err));
  }

  _onClick = event => {
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = event;
    const clickedFeature =
      features && features.find(f => f.layer.source === 'my-data');
    console.log(clickedFeature);
    this.setState({ selectedIndex: clickedFeature.id });
  };

  render() {
    const { photosGeojson, selectedIndex } = this.state;
    const selectedPhoto = selectedIndex
      ? photosGeojson.features[selectedIndex]
      : null;
    const photoPath = selectedPhoto ? selectedPhoto.properties.path : null;
    return (
      <div className={styles.container} data-tid="container">
        {photoPath && <MyImage path={photoPath} />}
        <Map
          geojsonData={photosGeojson}
          onClick={this._onClick}
          // onClick={() => console.log('clicked')}
        />
      </div>
    );
  }
}
