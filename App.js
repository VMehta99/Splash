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
const numPixelsFromText = generateRandomAlpha(5, 100) / 3;
console.log(numPixelsFromText);

// Convert image into perfect square.
const imgSize = Math.ceil(
   Math.sqrt(numPixelsFromText)
) * 2;

//Secret number is the starting Y value of the encoded string in the img.
const secretNumber = Math.floor(Math.random() * Math.ceil(Math.sqrt(str.length / 3))) + 1;
// console.log(secretNumber);
let count = endX = endY = 0;
let color = Jimp.cssColorToHex(randomColor());
let blitImage = null;


let image = new Jimp(imgSize, imgSize, encode_image);

// console.log(ghost);

let tint = new Jimp(1750, 1750, randomColor({
   format: "hex",
}), function (err, image) {
   image.opacity(.5)
});
let backgroundWhite = new Jimp(1750, 1750, "#000000", function (err, image) {
   // image.opacity(.9);
});
let backgroundBlack = new Jimp(1750, 1750, "#292D3E", function (err, image) {
   image.opacity(1);
});

let cover = new Jimp(1750, 1750, function (err, img) {
   // for(let i=0;i<=5;i++){
   let tmp = image.clone();

   tmp.composite(backgroundWhite, 0, 0, {
      mode: Jimp.BLEND_DESTINATION_OVER,
   })
   tmp.resize(1750, 1750);

   img.composite(tmp, 0, 0);
   img.opacity(1 / generateRandomAlpha(6, 1));

   img.pixelate(generateRandomAlpha(5, 100));
   img.blur(generateRandomAlpha(5, 200));
   // img.contrast(generateRandomAlpha(0,1,false));
   img.normalize();
   image.opacity(.5);
   
   let x = generateRandomAlpha(5,1)==2;
   if(x)
      image.sepia();
   if(x)
      image.grayscale();
   
   // console.log(ghost);

   Jimp.read("ghost.png").then(ghost=>{
      ghost.brightness(1);
      ghost.opacity(.5);
      ghost.resize(1080,1080)
      ghost.blit(image,0,0);
      ghost.autocrop();
      return ghost
   }).then(ghost=>{
      img.composite(ghost,335,335)
      .write('export.png');
   })

  
   
   img.contrast(.5)
   
   
   // console.log(gh);
   // img.composite(ghost,25,25)



  
   // }

});


function encode_image(err, image) {
   if (err) {
      throw err;
   }

   writePixels(image);

   image.resize(imgSize * (1080 / imgSize), imgSize * (1080 / imgSize), Jimp.RESIZE_NEAREST_NEIGHBOR);

   let ran = generateRandomAlpha(10, 1);
   console.log(ran);
   if (ran == 5) {
      console.log("true");
      image.color([{
            apply: 'hue',
            params: [generateRandomAlpha(360, -360)]
         },
         {
            apply: 'xor',
            params: [randomColor({
               format: "hex"
            })]
         }
      ])
   }
 

}



function generateRandomAlpha(max = 255, min = 255, floor = true) {
   let float = Math.random() * (max - min) + min;
   return floor ? Math.floor(float) : float;
}

function writePixels(image) {
   for (var x = 0; x < imgSize; x++) {
      for (var y = 0; y < imgSize; y++) {
         // start encoding when we reach the secret number.
         // if ((count <= str.length - 1) && (count > -1) && (x >= secretNumber)) {
         //    let genColor = get_color(count);
         //    color = Jimp.rgbaToInt(genColor.r, genColor.g, genColor.b, generateRandomAlpha());
         //    count += 3;
         // }else{
         color = Jimp.cssColorToHex(randomColor({
            luminosity: generateRandomAlpha(10,1) == 5?'bright':'',
            format: generateRandomAlpha(10,1) == 5?'rgba':'rgb'
         }));
         // }

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
      "r": count <= str.length - 1 ? str.charCodeAt(count) + 110 : 0,
      "g": count + 1 <= str.length - 1 ? str.charCodeAt(count + 1) + 110 : 0,
      "b": count + 2 <= str.length - 1 ? str.charCodeAt(count + 2) + 110 : 0
   };
   return x
}