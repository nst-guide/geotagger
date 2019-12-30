import React, { Component } from 'react';
import fs from 'fs-extra';
import styles from './Home.css';
import Map from './Map';
import MyImage from './MyImage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath:
        '/Users/kyle/Pictures/Photos Library.photoslibrary/originals/A/A1DFEE5C-483C-4B7A-990F-37B4F7CC0728.jpeg',
      photosGeojson: null
    };
  }

  componentDidMount() {
    const filePath =
      '/Users/kyle/github/mapping/nst-guide/create-database/nst-guide-web-photos.geojson';
    fs.readJSON(filePath).then(data => {
      return this.setState({ photosGeojson: data });
    });
  }

  render() {
    const { imagePath, photosGeojson } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        {imagePath && <MyImage path={imagePath} />}
        <Map geojsonData={photosGeojson} />
      </div>
    );
  }
}
