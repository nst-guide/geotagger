import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import Map from './Map';
import MyImage from './MyImage';
// var image = require("/Users/kyle/Pictures/Photos Library.photoslibrary/originals/A/A1DFEE5C-483C-4B7A-990F-37B4F7CC0728.jpeg")
// var image = require('/Users/kyle/Desktop/Screen Shot 2019-12-22 at 2.23.44 PM.png');
// "/Users/kyle/Pictures/Photos Library.photoslibrary/originals/5/558AC705-47E1-405D-B60B-208EADDF5B34.heic",

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: null
    };
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <MyImage
          path="/Users/kyle/Pictures/Photos Library.photoslibrary/originals/A/A1DFEE5C-483C-4B7A-990F-37B4F7CC0728.jpeg"
          height={400}
        />
        <Map />
      </div>
    );
  }
}
