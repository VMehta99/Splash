const fs = require("fs");
const { EncodedImage, SquareImage } = require("./modules/ImagesModule");

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