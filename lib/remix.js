'use strict';

var DEFAULT_VIDEO_HEIGHT = 295;
var DEFAULT_VIDEO_WIDTH = 525;

var matchYoutube = require('./remixes/youtube');
var matchVimeo = require('./remixes/vimeo')(DEFAULT_VIDEO_WIDTH, DEFAULT_VIDEO_HEIGHT);
var matchSoundCloud = require('./remixes/soundcloud');
var matchMixCloud = require('./remixes/mixcloud');
var matchRdio = require('./remixes/rdio');
var matchImage = require('./remixes/image');
var matchInstagram = require('./remixes/instagram');
var matchLink = require('./remixes/link');

var escapeHtml = function(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

var remixers = [
  // matchYoutube,
  matchVimeo,
  // matchSoundCloud,
  // matchMixCloud,
  // matchRdio,
  matchImage,
  // matchInstagram,
  // matchLink
];

/* Embed media if it matches any of the remixes in the remixers array.
 *
 * Requires: media string, callback
 * Returns: embedded media or the original string if nothing matches
 */
exports.process = function(media, options, callback) {
  if (!media) {
    callback(null, '');
  } else {
    media = escapeHtml(media);

    var matchedRemixer;

    remixers.forEach(function(remixer){
      matchedRemixer = remixer.match(media) || matchedRemixer;
    });

    if (matchedRemixer) {
      matchedRemixer(media, callback);
    }
    else {
      callback(null, media);
    }
  }
};
