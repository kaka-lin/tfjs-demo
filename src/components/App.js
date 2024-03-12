import './App.css';
import React, { Component } from 'react';
import Header from './Header';
import EditorContainer from './EditorContainer';

class App extends Component {
  state = { images: [] }

  onSelectedImages = images => {
    this.setState({ images: images })
  }

  render() {
    return (
      <React.StrictMode>
        <div className="main-container">
          <Header selectedImages={this.onSelectedImages}/>
          <EditorContainer images={this.state.images}/>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;

