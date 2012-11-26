'use strict';

var remix = require('./remix');

var imageRemix = module.exports = new remix.Remix({
  template: __dirname + '/../templates/image.html',
  serviceRegexp: /((http|https):\/\/)?(\S)+\.(jpg|jpeg|png|gif)($|(#|\?))/gi,
  process: function(media, callback) {
    callback(null, imageRemix.generateFromTemplate({
      wrapperClass: 'image-wrapper',
      linkHref: media,
      linkTarget: '_blank',
      imageSource: media
    }));
  }
});