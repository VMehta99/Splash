// Packages
const sha256 = require('js-sha256');
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
// console.log(secretNumber);
let count = endX = endY = 0;
let color = Jimp.cssColorToHex(randomColor());


let image = new Jimp(imgSize, imgSize, encode_image);
let backgroundWhite = new Jimp(1750, 1750, '#FFFFFF',function(err,image){});

let backgroundBlack = new Jimp(imgSize, imgSize, "#292D3E",function(err,image){
   image.resize(1750,1750, Jimp.RESIZE_NEAREST_NEIGHBOR);
   image.opacity(.9);
});

let cover = new Jimp(1750, 1750,function(err,img){
   let tmp = image.clone();
   tmp.composite(backgroundBlack,0,0,{
      mode:Jimp.BLEND_DESTINATION_OVER,
   })
   tmp.color([{ apply: 'shade', params: [20] }])
   tmp.resize(1750,1750);
   
   img.composite(tmp,0,0);
   img.opacity(1/generateRandomAlpha(8,1));

   img.pixelate(generateRandomAlpha(5,100));
   img.blur(generateRandomAlpha(5,200));
   img.contrast(generateRandomAlpha(0,1,false));
   
   img.contrast(1/generateRandomAlpha(10,1));

   img.composite(image,335,335)

   img.composite(backgroundWhite,0,0,{
      mode:Jimp.BLEND_DESTINATION_OVER,
   })
   
   

   img.write('export.png');

});


function encode_image(err, image) {
   if (err) {
      throw err;
   }

   writePixels(image); 

   // image.setPixelColor(Jimp.rgbaToInt(endX, endY, secretNumber, imgSize), 0, 0);
   // let key = Jimp.intToRGBA(image.getPixelColor(0,0));
   // console.log(key);

   image.resize(imgSize*(1080/imgSize),imgSize*(1080/imgSize), Jimp.RESIZE_NEAREST_NEIGHBOR);
   key = Jimp.intToRGBA(image.getPixelColor(0,0));
   
}



function generateRandomAlpha(max=255,min=255,floor=true) {
   let float = Math.random() * (max - min) + min;
   return floor?Math.floor(float):float;
}

function writePixels(image) {
   for (var x = 0; x < imgSize; x++) {
      for (var y = 0; y < imgSize; y++) {
         // start encoding when we reach the secret number.
         if ((count <= str.length - 1) && (count > -1) && (x >= secretNumber)) {
            let genColor = get_color(count);
            color = Jimp.rgbaToInt(genColor.r, genColor.g, genColor.b, generateRandomAlpha());
            count += 3;
         }else{
            color = Jimp.cssColorToHex(randomColor({
               luminosity: 'light',
               format: 'rgb'
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
   let x = {
      "r": count <= str.length - 1?str.charCodeAt(count) + 110:0,
      "g": count+1 <= str.length - 1?str.charCodeAt(count + 1) + 110:0,
      "b": count+2 <= str.length - 1?str.charCodeAt(count + 2) + 110:0
   };
   return x
}
