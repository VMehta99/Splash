const {readFileSync } = require('fs');
const Jimp = require('jimp');
const Image = require('./Image');
const type = 'image/png'

class ImageFromFile extends Image{
   constructor(path) {
      let jimp = getJimpHelper(path);
      super(jimp.bitmap.height,jimp.bitmap.width);
      this.jimp = jimp;
      this.path = path;
   }  

   clone(){
      return new ImageFromFile(this.path);
   }
}

function getJimpHelper(path){
   const buffer = readFileSync(path);
   const imageData = Jimp.decoders[type](buffer);
   const jimp = new Jimp(imageData);
   return jimp;
}


module.exports = ImageFromFile;