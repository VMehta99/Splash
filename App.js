// Packages
const Jimp = require('jimp');
const fs = require('fs');
const randomColor = require('randomcolor');

/**
 * Project Constants
 */
const str = fs.readFileSync("./sample.txt", "utf-8");
// Total number of pixels will be the string length/3 -> 3 chars per pixel
const numPixelsFromText = str.length / 3;

// Convert image into perfect square.
const imgSize = Math.ceil(
   Math.sqrt(numPixelsFromText)
) * 2;

//Secret number is the starting Y value of the encoded string in the img.
const secretNumber = Math.floor(Math.random() * Math.ceil(Math.sqrt(str.length / 3))) + 1;

let count = endX = endY = 0;
let color = Jimp.cssColorToHex(randomColor());


let image = new Jimp(imgSize, imgSize, encode_image);
let background = new Jimp(imgSize, imgSize, '#292D3E');


function encode_image(err, image) {
   if (err) {
      throw err;
   }

   writePixels(image); 
  
   image.setPixelColor(Jimp.rgbaToInt(endX, endY, secretNumber, generateRandomAlpha()), 0, 0);


   // let bac = Jimp.intToRGBA(background.getPixelColor(0,0));
   // console.log("Source data:");
   // console.log(bac);

   // let key = Jimp.intToRGBA(image.getPixelColor(0,0));
   // console.log("Destination Image data:");
   // console.log(key);

   // image.composite(background,0,0,{
   //    mode:Jimp.BLEND_ADD
   // })

   // let key2 = Jimp.intToRGBA(image.getPixelColor(0,0));
   //    console.log("Composite data:");
   //    console.log(key2);

   // image.contrast(.1);
   // image.resize(1024,1024, Jimp.RESIZE_NEAREST_NEIGHBOR);

   image.write('export.png');

}

function dstOver(src, dst, ops = 1) {
   src.a *= ops;
 
   const a = dst.a + src.a - dst.a * src.a;
   // x + 255 - 85 * x = 1
   const r = (dst.r * dst.a + src.r * src.a * (1 - dst.a)) / a;
   const g = (dst.g * dst.a + src.g * src.a * (1 - dst.a)) / a;
   const b = (dst.b * dst.a + src.b * src.a * (1 - dst.a)) / a;
 
   return { r, g, b, a };
 }

function generateRandomAlpha(max=255,min=1) {
   return Math.floor(min + Math.random()*(max + 1 - min))
}

function writePixels(image) {
   for (var x = 0; x < imgSize; x++) {
      for (var y = 0; y < imgSize; y++) {
         //start encoding when we reach the secret number.
         if ((count <= str.length - 1) && (count > -1) && (x >= secretNumber)) {
            let genColor = get_color(count);
            color = Jimp.rgbaToInt(genColor.r, genColor.g, genColor.b, generateRandomAlpha());
            count += 3;
         }else{
            color = Jimp.cssColorToHex(randomColor({
               luminosity: 'light',
               format: 'rgba'
            }));
         }
         
         image.setPixelColor(color, y, x);

         // finished writing data
         if (count > str.length - 1 && count != -1) {
            endX = x;
            endY = y;
            count = -1;
         }
      }
   }
}

function get_color(count) {
   return {
      "r": str.charCodeAt(count) + 110 || 0,
      "g": str.charCodeAt(count + 1) + 110 || 0,
      "b": str.charCodeAt(count + 2) + 110 || 0
   }
}