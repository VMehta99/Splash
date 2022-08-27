const Jimp = require('jimp');
const { replaceColorHelper, getRandomColor } = require('../../utils/ImageUtils');


class Image {
   constructor(height, width, bgColor = "", callBack = (err, image) => { }) {
      this.height = height;
      this.width = width;
      this.bgColor = bgColor;
      this.callBack = callBack;
      this.jimp = new Jimp(this.width, this.height, this.bgColor, this.callBack);
   }

   resize(height, width) {
      this.height = height;
      this.width = width;
      this.jimp.resize(width, height, Jimp.RESIZE_NEAREST_NEIGHBOR)
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
      return new Image(this.height, this.width, this.bgColor, this.callBack);
   }

   setPixelColor(color, positionX = 0, positionY = 0) {
      this.jimp.setPixelColor(color, positionX, positionY)
   }

   setOpacity(opacity) {
      this.jimp.opacity(opacity);
   }

   replaceColor(targetColor, replaceColor = "#00000000") {
      replaceColorHelper(this.jimp, targetColor, replaceColor)
   }

   setJimp(jimp) {
      this.jimp = jimp;
   }

   setBackground(color) {
      let background = new Image(this.height, this.width, color);
      this.compositeOver(background);
   }

   initializeImageWithRandomColors(format) {
      for (var y = 0; y < this.width; y++) {
         for (var x = 0; x < this.height; x++) {
            this.setPixelColor(getRandomColor(format), x, y);
         }
      }
   }
}

module.exports = Image;