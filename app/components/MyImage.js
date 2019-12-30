import React from 'react';
import execa from 'execa';
import pathlib from 'path';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: null
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }
    const { path } = this.props;
    const ext = path.split('.').pop();
    const validExt = ['png', 'jpg', 'jpeg'].includes(ext);
    const newPath = await this.convertImage(path);
    this.setState({ imagePath: newPath });
  }

  convertImage = async imagePath => {
    const basename = pathlib.parse(imagePath).name;
    const newPath = `/Users/kyle/.geotagger/${basename}.jpg`;
    await execa('sips', [imagePath, '-s', 'format', 'jpeg', '--out', newPath]);
    console.log(newPath);
    return newPath;
  };

  render() {
    const { imagePath } = this.state;
    return (
      <div>
        {imagePath && <img src={imagePath} alt="Error loading" height={400} />}
      </div>
    );
  }
}
