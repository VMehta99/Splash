const Jimp = require('jimp');

class Image {
   constructor(size, bgColor = "", callBack = (err, Image) => {}) {
      this.size = size;
      this.originalSize = this.size;
      this.bgColor = bgColor;
      this.callBack = callBack;
      this.jimp = new Jimp(this.size, this.size, this.bgColor, this.callBack);
   }

   resize(newSize) {
      this.originalSize = this.size;
      this.size = newSize;
      this.jimp.resize(newSize, newSize, Jimp.RESIZE_NEAREST_NEIGHBOR)
   }

   writeToFile(filePath) {
      this.jimp.write(filePath);
   }

   compositeOver(imageOnTop, positionX = 0, positionY = 0) {
      this.jimp.composite(imageOnTop.jimp, positionX, positionY, {
         mode: Jimp.BLEND_DESTINATION_OVER,
      })
   }

   compositeUnder(imageOnTop, positionX = 0, positionY = 0) {
      this.jimp.composite(imageOnTop.jimp, positionX, positionY, {
         mode: Jimp.BLEND_SOURCE_OVER,
      })
   }


   clone() {
      return new Image(this.size,this.bgColor,this.callBack);
   }

}

module.exports = Image;