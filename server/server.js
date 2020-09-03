const express = require('express');
const morgan = require('morgan');
const tesseract = require('node-tesseract-ocr');
const fs = require('fs');
const app = express();
const testChallenge = require('../test.json');

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/ocr', (req, res) => {
  fs.readFile('base64.txt', 'utf8', (err, data) => {
    let base64image = (data).split(';base64,').pop()
    fs.writeFile('image.png', base64image, {encoding: 'base64'}, err => {
      console.log('File created');
    })
  })
  
  const config = {
    lang: 'eng',
    oem: 1,
    psm: 3,
  }

  tesseract.recognize('image.png', config)
    .then(text => {
      const reg = new RegExp(testChallenge);

      if(text.match(/100%|180%|188%|108%/) && text.match(reg)) {
        console.log('true');
      };
      console.log(text)
    })
    .catch(error => {
      console.log(error.message)
    })
})

module.exports = app;
