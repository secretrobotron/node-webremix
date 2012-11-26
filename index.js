'use strict';

var remix = require('./lib/remix');

function Generator(options) {

  options = options || {};

  this.generate = function(content, options, callback) {
    var contentArr = content.split(/\s/);
    var finalContent = [];

    if (!callback) {
      callback = options;
      options = {};
    }

    var responses = 0;
    contentArr.forEach(function(content, idx) {
      remix.process(content, options, function(err, resp) {
        if (err) {
          callback(err);
        } else {
          finalContent[idx] = resp;
        }
        if (++responses === contentArr.length) {
          callback(null, finalContent.join(' '));
        }
      });
    });
  };

}

var defaultGenerator = new Generator();

exports.generate = defaultGenerator.generate;