const fs = require("fs");
const { EncodedImage, SquareImage, ImageFromFile, Image } = require("./modules/ImagesModule");


function generateEncoded(){
   const str = fs.readFileSync("./sample.txt", "utf-8");

   const blackBackground = new SquareImage(1750, "#292D3E");

   let encodedImage = new EncodedImage(str, false);
   encodedImage.resize(1080);
   
   let compositeBackground = encodedImage.clone();
   compositeBackground.compositeOver(blackBackground);
   compositeBackground.jimp.resize(1750, 1750);
   
   // add filters
   compositeBackground.jimp.color([{ apply: 'shade', params: [30] }])
   compositeBackground.jimp.blur(75)
   
   //combine images
   compositeBackground.compositeUnder(encodedImage, 355, 355);
   compositeBackground.key = encodedImage.key;
   compositeBackground.writeKey(355, 355)
   
   compositeBackground.writeToFile("./exports/composite.png");
}

generateEncoded()

function generatePatrick(){
   let patrick = new ImageFromFile("./assets/patrick.png")
   patrick.setBackground("#32CD32");
   
   patrick.replaceColor("#ff9176");
   patrick.replaceColor("#f35535", "#000000")
   patrick.jimp.autocrop();
   patrick.resize(1080, 1080);
   
   let background = new SquareImage(25);
   background.initializeImageWithRandomColors('rgb');
   background.resize(1080);
   
   patrick.compositeOver(background)
   patrick.replaceColor("#32CD32");
   
   patrick.writeToFile("./exports/patrick.png");
}

generatePatrick()