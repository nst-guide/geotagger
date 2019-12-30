import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import Map from './Map';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <img
          src="/Users/kyle/Pictures/Photos Library.photoslibrary/originals/A/A1DFEE5C-483C-4B7A-990F-37B4F7CC0728.jpeg"
          alt="Error loading"
          height={400}
        />
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        <Map />
      </div>
    );
  }
}
