const Jimp = require("jimp/");
const Image = require("./Image");

class SquareImage extends Image {
   constructor(size, bgColor = "", callBack = (err, Image) => { }) {
      super(size, size, bgColor, callBack);
         this.size = size;
   }

   resize(newSize) {
      super.resize(newSize,newSize);
   }
}

module.exports = SquareImage;