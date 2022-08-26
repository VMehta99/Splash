const {readFileSync } = require('fs');
const Jimp = require('jimp');
const Image = require('./Image');

class ImageFromFile{
   constructor(path) {
      this.jimp = this.#getJimpFromFile(path);
   }

   #getJimpFromFile(path){
      const type = 'image/png'
      const buffer = readFileSync(path);
      const imageData = Jimp.decoders[type](buffer);
      const jimp = new Jimp(imageData);
      return jimp;
   }
   
   


}

module.exports = ImageFromFile;