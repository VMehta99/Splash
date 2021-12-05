const Jimp = require('jimp');


/*
1. Get original values using algo
2. resize
3. decode
*/

function test(r,fg) {
   if (1 - fg.A <= 1.0e-6) return null; // No result -- 'fg' is fully opaque
   if (r.A - fg.A < -1.0e-6) return null; // No result -- 'fg' can't make the result more transparent
   if (r.A - fg.A < 1.0e-6) return bg; // Fully transparent -- R,G,B not important
   bg.A = 1 - (1 - r.A) / (1 - fg.A);
   bg.R = (r.R * r.A - fg.R * fg.A) / (bg.A * (1 - fg.A));
   bg.G = (r.G * r.A - fg.G * fg.A) / (bg.A * (1 - fg.A));
   bg.B = (r.B * r.A - fg.B * fg.A) / (bg.A * (1 - fg.A));
   console.log(bg);
}

function decodeImage(){
   let image = Jimp.read('export.png', (err, img) => {
      if (err) throw err;

      // img.contrast( -.2 ); 
      // get the key value
      let key = Jimp.intToRGBA(img.getPixelColor(335,335));
      console.log(key);
      // test({
      //    R:key.r,
      //    G:key.g,
      //    B:key.b,
      //    A:key.a
      // },{
      //    R:(41/255),
      //    G:(45/255),
      //    B:(62/255),
      //    A:(255*.9)
      // });
      let startingY = key.b;
      let endingY = key.r;
      let endingX= key.g;
      let imageSize = key.a;

      img.resize(imageSize,imageSize, Jimp.RESIZE_NEAREST_NEIGHBOR);
      
      img.write("decoded.png");


      let returnString = ""


      for (var y = startingY; y <= endingY; y++) {         
         for (var x = 0; x <= img.getWidth(); x++) {
         
            
            //TODO: Do not remove 110 from pixels w/ value of 0
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