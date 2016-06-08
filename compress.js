#!/usr/bin/env node

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
const fse = require('fs-extra');
const minimatch = require("minimatch");


const helpMessage = 'Usage: node compress.js [resource path] [output path]'

function isDrawableDirName(name) {
  return name.includes('drawable')
}

function compressPictures(input, output) {
  imagemin([input + '/*[!.][!9].{jpg,png}'], output, {
      plugins: [
          imageminMozjpeg({targa: true}),
          imageminPngquant({quality: '65-80'})
      ]
  }).then(files => {

  }, error => {
      console.log('' + error);
  });
}

if (process.argv.length <= 2) {
  console.log(helpMessage);
  process.exit(-1);
} else if (process.argv.length == 3 && process.argv[2] == '-h') {
  console.log(helpMessage);
  process.exit(1);
}

var resPath = process.argv[2];
var optPath = process.argv[3];

console.log("Start to compress...");

fsStats = fs.statSync(resPath);
if (fsStats.isDirectory()) {
  items = fs.readdirSync(resPath);
  for (var j = 0; j < items.length; j++) {
    var name = items[j]
    if(isDrawableDirName(name)) {
      compressPictures(resPath + '/' + name, optPath + '/' + name)
    }
  }
} else {
  console.log('Error: Only accept directory input');
}
