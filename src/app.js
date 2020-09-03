import React, { Component } from 'react';
import base64 from '../base64.txt';
import image from '../to0jY7R.jpg';

export default class App extends Component {
  constructor(props) {
    super(props);
  this.sendImage = this.sendImage.bind(this);
  }

  sendImage() {
    fetch(`/ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({image: base64})
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <button onClick={this.sendImage}>send image to server</button>
      </div>
    )
  }
}
