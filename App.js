const fs = require("fs");

const str = fs.readFileSync("./sample.txt", "utf-8");
const EncodedImage = require("./EncodedImage");
const Image = require("./Image");
const blackBackground = new Image(1750,"#292D3E");


let encodedImage = new EncodedImage(str);
encodedImage.resize(1080);


let background = encodedImage.clone();
background.compositeOver(blackBackground);
background.jimp.contrast(1)
background.jimp.gaussian(2);
background.jimp.resize(1750,1750);
background.compositeUnder(encodedImage,355,355);
background.key = encodedImage.key;
background.setKey(355,355)
background.writeToFile("./exports/composite.png");