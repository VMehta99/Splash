const Jimp = require('jimp');
const fs = require('fs');
var randomColor = require('randomcolor'); 


let color = Jimp.cssColorToHex(randomColor());
var str = fs.readFileSync("./sample.txt", "utf-8");
let count=0;

//Height/width of img is th squareRoot of the length of the string/3 (3 because each pixel can hold 3 chars) * 2 (for randomness);
let imgSize = Math.ceil(Math.sqrt(str.length/3))*2;

//Secret number is the starting Y value of the encoded string in the img.
let secretNumber = Math.floor(Math.random() * Math.ceil(Math.sqrt(str.length/3))) + 1;

let endX = 0;
let endY = 0;

let image = new Jimp(imgSize, imgSize, function (err, image) {
   if (err) throw err;
   //loop through the img
   for (var x = 0; x < imgSize; x++) {
      for (var y = 0; y < imgSize; y++) {

         //start encoding when we reach the secret number.
         if(count<=str.length-1 && x>=secretNumber && count>-1){
            color = Jimp.rgbaToInt(str.charCodeAt(count)+110||0,str.charCodeAt(count+1)+110 || 0,str.charCodeAt(count+2)+110||0,Math.floor(Math.random() * 255) + 1  );
            count+=3;
         }
         // This randomly generate a color to fill up space.
         else
            color = Jimp.cssColorToHex(randomColor({luminosity: 'light',format:'rgba'}));
         
         //clearly messed up here: , but it works? so whatever.
         image.setPixelColor(color, y, x);

         if(count>str.length-1 && count!=-1){
            endX = x;
            endY = y;
            count = -1;
         }
         

      }
   }
   // index 0,0 has the info
   image.setPixelColor(Jimp.rgbaToInt(endX,endY,secretNumber,Math.floor(Math.random() * 255) + 1 ), 0, 0);

   image.write('export.png', (err) => {
      if (err) throw err;
   });
});

