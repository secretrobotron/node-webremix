'use strict';

var remix = require('./remix');

module.exports = function(defaultVideoWidth, defaultVideoHeight) {
  var vimeoRemix = new remix.Remix({
    template: __dirname + '/../templates/iframe.html',
    serviceRegexp: /vimeo/i,
    match: function(media) {
      if ( vimeoRemix.testServiceRegexp(media) ) {
        var url = media.split('/');
        var vimeoId = parseInt(url[url.length - 1], 10);
        if (!isNaN(vimeoId)) {
          return vimeoRemix.generateProcessFunction(vimeoId);
        }
      }
    },
    process: function(media, callback, vimeoId) {
      callback(null, vimeoRemix.generateFromTemplate({
        wrapperClass: 'object-wrapper',
        iframeWidth: defaultVideoWidth,
        iframeHeight: defaultVideoHeight,
        iframeSource: '//player.vimeo.com/video/' + vimeoId
      }));
    }
  });

  return vimeoRemix;
};