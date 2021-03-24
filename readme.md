# Slash
![screenshot](https://i.imgur.com/S6f5F8W.png)

*Encode hidden text in images*

## How to use it:
1. `npm install`
2. Edit `sample.txt`with your text
3. `node App.js`

## To decode:

4. `node Decode.js`


## How it works:
Each triplet of characters is stored as an RGB value for a pixel. The alpha for that pixel is randomly chosen to hide the string.

Pixel 0,0 is the key, and contains information about the starting and ending position of the encoded string.




