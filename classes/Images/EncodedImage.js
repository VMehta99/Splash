const Jimp = require('jimp');
const randomColor = require('randomcolor');
const SquareImage = require('./SquareImage');

class EncodedImage extends SquareImage {
   #BRIGHTEN_FACTOR = 110;

   constructor(encodedMessage = "", useAlpha = false) {
      super(Math.ceil(Math.sqrt(encodedMessage.length / 3)) * 2);
         this.useAlpha = useAlpha;
         this.encodedMessage = encodedMessage;
         this.originalSize = this.size;
         this.#setStartingRow();
         this.#generateImage();
   }

   clone() {
      return new EncodedImage(this.encodedMessage);
   }

   writeKey(positionX = 0, positionY = 0) {
      this.jimp.setPixelColor(this.key.toHex(), positionX, positionY)
   }

   #generateImage() {
      this.#initializeImageWithRandomColors();
      this.#writeEncodedMessageToPixels();
   }

   #writeEncodedMessageToPixels() {
      let numCharactersEncoded = 0;
      for (let y = this.startingEncodingRow; y < this.size; y++) {
         for (let x = 0; x < this.size; x++) {
            let color = this.#getColorFromChar(numCharactersEncoded);
            this.setPixelColor(color, x, y);
            numCharactersEncoded += 3;

            if (numCharactersEncoded >= this.encodedMessage.length)
               return this.#setKey(x, y);
         }
      }
   }

   #initializeImageWithRandomColors() {
      for (var y = 0; y < this.size; y++) {
         for (var x = 0; x < this.size; x++) {
            this.setPixelColor(this.#getRandomColor(), x, y);
         }
      }
   }

   #setKey(endX, endY) {
      this.key = new Key(endX, endY, this.startingEncodingRow, this.originalSize);
   }

   #getColorFromChar(charsEncoded) {
      let color = {
         "r": this.encodedMessage.charCodeAt(charsEncoded) + this.#BRIGHTEN_FACTOR || 0,
         "g": this.encodedMessage.charCodeAt(charsEncoded + 1) + this.#BRIGHTEN_FACTOR || 0,
         "b": this.encodedMessage.charCodeAt(charsEncoded + 2) + this.#BRIGHTEN_FACTOR || 0
      };
      return Jimp.rgbaToInt(color.r, color.g, color.b, this.#generateRandomNumber());
      // return Jimp.rgbaToInt(255,255,255,this.#generateRandomNumber());
   }

   #getRandomColor() {
      return Jimp.cssColorToHex(randomColor({
         luminosity: 'light',
         format: this.useAlpha ? 'rgba' : 'rgb'
      }));
   }

   #generateRandomNumber(max = 255, min = 255, floor = true) {
      let float = Math.random() * (max - min) + min;
      return floor ? Math.floor(float) : float;
   }

   #setStartingRow() {
      this.startingEncodingRow = Math.floor(Math.random() * this.size / 2) + 1;
   }
}

class Key {
   constructor(endX, endY, startingEncodingRow, originalSize) {
      this.endX = endX;
      this.endY = endY;
      this.startingEncodingRow = startingEncodingRow;
      this.originalSize = originalSize;
   }

   toHex() {
      return Jimp.rgbaToInt(this.endY, this.endX, this.startingEncodingRow, this.originalSize)
   }

}

module.exports = EncodedImage;