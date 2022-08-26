const Jimp = require("jimp/");
const Image = require("./Image");

class SquareImage extends Image {
   constructor(size, bgColor = "", callBack = (err, Image) => { }) {
      super(size, size, bgColor, callBack);
         this.size = size;
   }

   resize(newSize) {
      this.size = newSize
      this.jimp.resize(newSize, newSize, Jimp.RESIZE_NEAREST_NEIGHBOR)
   }
}

module.exports = SquareImage;