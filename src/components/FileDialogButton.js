import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class FileDialogButton extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  setDropZone = ({ getRootProps, getInputProps, open }) => {
    return (
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <button
          className="ui inverted button"
          onClick={open}>
          {this.props.children}
        </button>
      </div>
    );
  }

  onDrop = files => {
    // Before we create the new uris,
    // we revoke the data uris first to avoid memory leaks
    this.state.files.forEach(
      file => URL.revokeObjectURL(file.preview));

    // Create the new data uris
    files.map(file => {
      Object.assign(file, {
        preview: URL.createObjectURL(file)})
    });

    this.setState({files});
  }

  onDropAccepted = () => {
    this.props.selectedImages(this.state.files);
    console.log(this.state.files)
  }

  componentDidMount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(
      file => URL.revokeObjectURL(file.preview));
  }

  render() {
    return (
      <div className="button-item container">
        <Dropzone
          accept="image/*"
          noClick={true}
          noKeyboard={true}
          onDrop={this.onDrop}
          onDropAccepted={this.onDropAccepted}
        >
          {this.setDropZone}
        </Dropzone>
      </div>
    );
  }
}

export default FileDialogButton;
