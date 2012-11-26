'use strict'

var fs = require('fs');
var jade = require('jade');

function Remix(options) {
  options = options || {};

  var processFunction = options.process || function(){};
  var serviceRegexp = options.serviceRegexp || new RegExp();
  var matchFunction;
  var templateFunction;
  var processQueue = [];

  var thisRemix = this;

  function testServiceRegexp(testStr){
    return !!testStr.match(serviceRegexp);
  }

  function defaultMatchFunction(testStr) {
    return testServiceRegexp(testStr) ? thisRemix.process : null;
  }

  this.generateFromTemplate = function(templateOptions) {
    var r = templateFunction(templateOptions);
    return r;
  };

  this.match = function(media) {
    return matchFunction(media);
  };

  this.generateProcessFunction = function() {
    var that = this;
    var args = Array.prototype.slice.call(arguments);
    return function(media, callback){
      thisRemix.process.apply(that, [media, callback].concat(args));
    };
  };

  matchFunction = options.match || defaultMatchFunction;
  this.process = processFunction;
  this.testServiceRegexp = testServiceRegexp;

  if (options.template) {
    this.process = function(media, callback) {
      processQueue.push(Array.prototype.slice.call(arguments));
    }

    fs.readFile(options.template, 'utf8', function (err, data) {
      if (!err) {
        templateFunction = jade.compile(data, {
          filename: options.template,
          pretty: options.pretty
        });

        process.nextTick(function(){
          var args;
          thisRemix.process = processFunction;
          while (processQueue.length > 0) {
            args = processQueue.pop();
            thisRemix.process.apply(thisRemix, args);
          }
        });
      }
      else {
        console.log(err);
      }
    });
  }
  else {
    templateFunction = function(input) {
      return input;
    };
  }
}

exports.Remix = Remix;