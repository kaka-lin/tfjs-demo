import './EditorContainer.css'
import React, { Component } from 'react';
import SideBar from './SideBar';
import ImageEditor from './ImageEditor';
import Model from './Model';

class EditorContainer extends Component {
  state = {selectedImage: {}};

  onImageClick = image => {
    this.setState({ selectedImage: image});
  }

  onSelectedArea = area => {
    this.setState({ selectedArea: area});
  }

  render() {
    return (
      <div className="editor-container">
        <SideBar
          images={this.props.images}
          onClick={this.onImageClick}/>
        <ImageEditor
          selectedImage={this.state.selectedImage}
          onSelectedArea={this.onSelectedArea}/>
        <Model
          selectedImage={this.state.selectedImage}
          selectedArea={this.state.selectedArea}/>
      </div>
    );
  }
}

export default EditorContainer;
