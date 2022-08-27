const colorConvert = require('color-convert')
const deltaE = require('delta-e')
const Jimp = require('jimp');
const randomColor = require("randomcolor");

/**
 * @Author: Vladyslav Turak <turakvlad@gmail.com>
 * https://github.com/turakvlad/replace-color/blob/master/LICENSE
**/
function convertColor(from, to, color) {
   let alpha = null
   if (from === 'hex' && color.length === 9) {
      alpha = color.slice(1, 3)
      color = color.slice(0, 1) + color.slice(3)
      alpha = parseInt(alpha, 16)
   }

   if (from === 'rgb' && color.length === 4) {
      alpha = color.pop()
      alpha = Math.round(alpha * 255)
   }

   if (from === to) return [...color, alpha]
   return [...colorConvert[from][to](color), alpha]
}

/**
 * @Author: Vladyslav Turak <turakvlad@gmail.com>
 * https://github.com/turakvlad/replace-color/blob/master/LICENSE
**/
function getDelta(LAB1, LAB2, formula) {
   return deltaE[`getDelta${formula}`](
      { L: LAB1[0], A: LAB1[1], B: LAB1[2] },
      { L: LAB2[0], A: LAB2[1], B: LAB2[2] }
   )
}

/**
 * @Author: Vladyslav Turak <turakvlad@gmail.com>
 * https://github.com/turakvlad/replace-color/blob/master/LICENSE
**/
function replaceColorHelper(jimp, targetColor, replaceColor, type = "hex") {
   const targetLABColor = convertColor(type, 'lab', targetColor)
   const replaceRGBColor = convertColor(type, 'rgb', replaceColor)
   let formula = 'E00';
   let deltaE = 2.3;

   jimp.scan(0, 0, jimp.bitmap.width, jimp.bitmap.height, (x, y, idx) => {
      const currentLABColor = convertColor('rgb', 'lab', [
         jimp.bitmap.data[idx],
         jimp.bitmap.data[idx + 1],
         jimp.bitmap.data[idx + 2]
      ])

      if (getDelta(currentLABColor, targetLABColor, formula) <= deltaE) {
         jimp.bitmap.data[idx] = replaceRGBColor[0]
         jimp.bitmap.data[idx + 1] = replaceRGBColor[1]
         jimp.bitmap.data[idx + 2] = replaceRGBColor[2]
         if (replaceRGBColor[3] !== null) jimp.bitmap.data[idx + 3] = replaceRGBColor[3]
      }
   });
}

function getRandomColor(format) {
   return Jimp.cssColorToHex(randomColor({
      luminosity: 'light',
      format: format
   }));
}

module.exports = { replaceColorHelper: replaceColorHelper, getRandomColor: getRandomColor };