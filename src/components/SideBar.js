import './SideBar.css';
import React, { Component } from 'react';
import CustomImageList from './CustomImageList';

class SideBar extends Component {
  state = {
    width: null,
    height: null,
    selectedImage: {},
  };

  onImageSelected = image => {
    this.setState({ selectedImage: image});
    this.props.onClick(image);
  }

  componentDidMount() {
    this.setState({
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
    });
  }

  render() {
    return (
      <div className="SideBarContainer" ref={el =>(this.container = el)}>
        <CustomImageList
          images={this.props.images}
          onImageSelected={this.onImageSelected}/>
      </div>
    );
  }
}

export default SideBar;




