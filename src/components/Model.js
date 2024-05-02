import './Model.css';
import React, { Component } from 'react';
import Button from './Button';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { render } from '@testing-library/react';

class Model extends Component {
  constructor(props) {
    super(props);
  }

  async runModel() {
    const model = await tf.loadGraphModel('https://raw.githubusercontent.com/kaka-lin/EfficientSAM-tf2-demo/main/weights/web_model/efficient_sam_vitt/model.json');

    // Get content image
    let image = new Image(1024, 1024, 3);
    image.src = this.props.selectedImage.preview;

    // Convert image to tensor and add batch dimension
    let tfTensor = tf.browser.fromPixels(image);
    // tfTensor = tf.image.resizeBilinear(tfTensor, [1024, 1024]);
    let inputTensor = tfTensor.div(255.0);
    inputTensor = inputTensor.expandDims(0);
    inputTensor = tf.cast(inputTensor, 'float32');

    const input_points = tf.tensor([[[[500, 630], [580, 630]]]]);
    const input_labels = tf.tensor([[[1, 1]]]);

    // Run image through model
    // var predicted_logits, predicted_iou;

    const preds = model.execute([inputTensor, input_points, input_labels], ["output_1", "output_2"]);
    const predicted_logits = preds[0];
    const predicted_iou = preds[1];

    let outTensor = predicted_logits.squeeze()
    const mask = tf.greaterEqual(outTensor.slice([0, 0], [1, 1024]), 0).squeeze().arraySync();
    const maskTensor = tf.tensor(mask);
    const maskedImageTensor = tf.mul(tfTensor, maskTensor.expandDims(2));
    let outputTensor = maskedImageTensor.div(255.0);

    // Prepare rendering of the result
    const canvas = document.getElementById('result');
    await tf.browser.toPixels(outputTensor, canvas);
  }

  render() {
    return (
      <div className='model-area'>
        <Button onClick={this.runModel.bind(this)}>Run model</Button>
        <canvas className='result-area' id="result"></canvas>
      </div>
    );
  }
}

export default Model;

