import './Header.css'
import React, { Component } from 'react';
import Button from './Button';
import FileDialogButton from './FileDialogButton';

class Header extends Component {
  onSelectedImages = images => {
    this.props.selectedImages(images);
  }

  render() {
    return (
      <div className="ui inverted menu">
        <div className="header item">
          TensorFlow.js Demo
        </div>
        <div className="right menu primary">
          <FileDialogButton
            selectedImages={this.onSelectedImages}
          >
            Open
          </FileDialogButton>
          <Button>Export</Button>
        </div>
      </div>
    );
  }
}

export default Header;
