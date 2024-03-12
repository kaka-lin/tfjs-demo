import './ImageEditor.css';
import  React, { Component } from 'react';

class ImageEditor extends Component {
  /** @param {Record<string, any>} props */
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.state = {
      startX: 0,
      startY: 0,
      width: 0,
      height: 0,
      scale: 0,
      image_width: 0,
      image_height: 0,
      isDrawing: false,
    };
  }

  componentDidMount() {
    this.canvas = this.myRef.current;
    this.ctx = this.canvas.getContext("2d");

    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 3;

    this.canvas.addEventListener('mousemove', this.onMouseMove)
    this.canvas.addEventListener('mousedown', this.onMouseDown)
    this.canvas.addEventListener('mouseup', this.onMouseUp)
  }

  componentDidUpdate() {
    // Mouse Down and up would trigger the update
    // setting canvas
    var rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width
    this.canvas.height = rect.height

    // load image
    const img = new Image();
    img.src = this.props.selectedImage.preview;
    const scale = img.width / this.canvas.width;
    const scaleHeight = img.height / scale;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    img.onload = () => {
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 3;
      this.ctx.drawImage(img, 0, 0, this.canvas.width, scaleHeight);
      this.ctx.strokeRect(this.state.startX, this.state.startY, this.state.width, this.state.height);
    }
  }

  onMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      startX: event.offsetX,
      startY: event.offsetY,
      width: 0,
      height: 0,
      isDrawing: true
    })
  }

  onMouseMove = event => {
    if (this.state.isDrawing === true) {
      // reload image
      const img = new Image();
      img.src = this.props.selectedImage.preview;
      const scale = img.width / this.canvas.width;
      const scaleHeight = img.height / scale;

      // get current mouse position and connot over the image
      var currX = event.offsetX > this.canvas.width ? this.canvas.width : event.offsetX;
      var currY = event.offsetY > scaleHeight ? scaleHeight : event.offsetY;

      var width = currX - this.state.startX;
      var height = currY - this.state.startY;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      img.onload = () => {
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 3;
        this.ctx.drawImage(img, 0, 0, this.canvas.width, scaleHeight);
        this.ctx.strokeRect(this.state.startX, this.state.startY, width, height);
      }

      this.setState({
        width: width,
        height: height,
        scale: scale,
        image_width: img.width,
        image_height: img.height,
      });
    }
  }

  onMouseUp = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      isDrawing: false
    });

    this.props.onSelectedArea({
      x: this.state.startX,
      y: this.state.startY,
      width: this.state.width,
      height: this.state.height,
      scale: this.state.scale,
      image_width: this.state.image_width,
      image_height: this.state.image_height,
    });
  }

  render() {
    return (
      <canvas
        id='canvas'
        className="image-viewer"
        ref={this.myRef}
        style={{cursor: 'crosshair'}}/>
    );
  }
}

export default ImageEditor;
