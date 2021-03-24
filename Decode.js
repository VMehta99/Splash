const Jimp = require('jimp');

function decodeImage(){
   let image = Jimp.read('export.png', (err, img) => {
      if (err) throw err;

      // get the key value
      let key = Jimp.intToRGBA(img.getPixelColor(0,0));

      let startingY = key.b;
      let endingY = key.r;
      let endingX= key.g;
      let returnString = ""


      for (var y = startingY; y <= endingY; y++) {         
         for (var x = 0; x <= img.getWidth(); x++) {
         
            returnString += 
               String.fromCharCode(Jimp.intToRGBA(img.getPixelColor(x,y)).r-110) + 
               String.fromCharCode(Jimp.intToRGBA(img.getPixelColor(x,y)).g-110) + 
               String.fromCharCode(Jimp.intToRGBA(img.getPixelColor(x,y)).b-110)
            
            if(x==endingX && y==endingY)
               break;
         }
      }
        
      console.log(returnString);

    });
};

decodeImage();