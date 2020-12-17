const { imageHash } = require("image-hash");

function getImageHash(url) {
  return new Promise((resolve, reject) => {
    imageHash(url, 16, true, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
};

module.exports = getImageHash;
