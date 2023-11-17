const ImageKit = require('imagekit');

const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_SECRET_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

module.exports = new ImageKit({
  privateKey: IMAGEKIT_SECRET_KEY,
  publicKey: IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});

