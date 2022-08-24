const Jimp = require('jimp');
const randomColor = require('randomcolor');
const Image = require('./Image');

class EncodedImage extends Image {

   constructor(encodedMessage = "", useAlpha = false) {
      super(Math.ceil(Math.sqrt(encodedMessage.length / 3)) * 2);
      this.useAlpha = useAlpha;
      this.originalSize = this.size;
      this.startingEncodingRow = Math.floor(Math.random() * Math.ceil(Math.sqrt(encodedMessage.length / 3))) + 1;
      this.encodedMessage = encodedMessage;
      this.writeMessageToPixels();
   }

   writeMessageToPixels() {
      let count, endX, endY; count = endX = endY = 0;
      let color;

      for (var x = 0; x < this.size; x++) {
         for (var y = 0; y < this.size; y++) {
            if ((count <= this.encodedMessage.length - 1) && (count > -1) && (x >= this.startingEncodingRow)) {
               let genColor = this.get_color(count);
               color = Jimp.rgbaToInt(genColor.r, genColor.g, genColor.b, this.generateRandomNumber());
               count += 3;
            } else {
               color = Jimp.cssColorToHex(randomColor({
                  luminosity: 'light',
                  format: this.useAlpha?'rgba':'rgba'
               }));
            }
            this.jimp.setPixelColor(color, y, x);
            if (count > this.encodedMessage.length - 1 && count != -1) {
               endX = x;
               endY = y;
               count = -1;
               this.key = {
                  endX: endX,
                  endY: endY,
                  startingEncodingRow: this.startingEncodingRow,
                  originalSize: this.originalSize
               }
            }
         }
      }

   }

   clone() {
      return new EncodedImage(this.encodedMessage);
   }

   setKey(positionX = 0, positionY = 0) {
      this.jimp.setPixelColor(Jimp.rgbaToInt(this.key.endX, this.key.endY, this.key.startingEncodingRow, this.key.originalSize), positionX, positionY)
   }

   get_color(count) {
      let color = {
         "r": count <= this.encodedMessage.length - 1 ? this.encodedMessage.charCodeAt(count) + this.generateRandomNumber(110, 110) : 0,
         "g": count + 1 <= this.encodedMessage.length - 1 ? this.encodedMessage.charCodeAt(count + 1) + this.generateRandomNumber(110, 110) : 0,
         "b": count + 2 <= this.encodedMessage.length - 1 ? this.encodedMessage.charCodeAt(count + 2) + this.generateRandomNumber(110, 110) : 0
      };
      return color
   }

   generateRandomNumber(max = 255, min = 255, floor = true) {
      let float = Math.random() * (max - min) + min;
      return floor ? Math.floor(float) : float;
   }

}

module.exports = EncodedImage;