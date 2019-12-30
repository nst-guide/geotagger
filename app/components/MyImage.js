import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import execa from 'execa';

export default class Map extends React.Component {
  convertImage = imagePath => {};

  render() {
    const { path } = this.props;
    const ext = path.split('.').pop();
    const validExt = ['png', 'jpg', 'jpeg'].includes(ext);
    return (
      <div>
        {validExt ? (
          <img src={path} alt="Error loading" height={400} />
        ) : (
          <p>Invalid image extension</p>
        )}
      </div>
    );
  }
}
