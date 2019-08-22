const PNG = require('png-js');
const sizeOf = require('image-size');

module.exports = function() {
  return new Promise((resolve) => {

    let dimensions = sizeOf(this.resourcePath);

    PNG.decode(this.resourcePath, function(pixels) {
      let image = {
        pixels: pixels,
        info: dimensions
      };

      resolve(`export default ${ JSON.stringify(image) }`);
    });
  });
};
