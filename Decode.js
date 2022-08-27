const Jimp = require('jimp');

const Key_Index = 355;
const Encoded_Image_Size = 1080;

Jimp.read('./exports/composite.png', (_, img) => {
   let key = Jimp.intToRGBA(img.getPixelColor(Key_Index, Key_Index));

   let endingY = key.r;
   let endingX = key.g;
   let startingY = key.b;
   let imageSize = key.a;

   img.crop(Key_Index, Key_Index, Encoded_Image_Size, Encoded_Image_Size);
   img.resize(imageSize, imageSize, Jimp.RESIZE_NEAREST_NEIGHBOR);

   let returnString = "";
   for (var y = startingY; y <= endingY; y++) {
      for (var x = 0; x <= imageSize; x++) {
         returnString +=
            String.fromCharCode(Math.max(Jimp.intToRGBA(img.getPixelColor(x, y)).r - 110, 0)) +
            String.fromCharCode(Math.max(Jimp.intToRGBA(img.getPixelColor(x, y)).g - 110, 0)) +
            String.fromCharCode(Math.max(Jimp.intToRGBA(img.getPixelColor(x, y)).b - 110, 0))
         if (x == endingX && y == endingY)
            break;
      }
   }
   console.log(returnString);
});