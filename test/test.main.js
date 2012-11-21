'use strict';

var nock = require('nock');
var should = require('should');
var webRemix = require('../index');

describe('webremix', function() {
  describe('.generate',  function() {
    it('returns embed code for a youtu.be short url', function(done) {
      var youtube = 'http://youtu.be/5cazkHAHiPU';
      webRemix.generate(youtube, function(err, subject) {
        subject.should.equal('<div class="object-wrapper"><iframe width="525" height="295" src="//www.youtube.com/embed/5cazkHAHiPU?wmode=transparent" ' +
        'frameborder="0" allowfullscreen></iframe></div>');
        done();
      });
    });

    it('returns embed code for a youtube normal url', function(done) {
      var youtube = 'http://www.youtube.com/watch?v=5cazkHAHiPU';
      webRemix.generate(youtube, function(err, subject) {
        subject.should.equal('<div class="object-wrapper"><iframe width="525" height="295" src="//www.youtube.com/embed/5cazkHAHiPU?wmode=transparent" ' +
          'frameborder="0" allowfullscreen></iframe></div>');
        done();
      });
    });

    it('returns embed code for a vimeo video url', function(done) {
      var vimeo = 'http://vimeo.com/37872583';
      webRemix.generate(vimeo, function(err, subject) {
        subject.should.equal('<div class="object-wrapper"><iframe src="//player.vimeo.com/video/37872583" width="525" height="295" ' +
          'frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>');
        done();
      });
    });

    it('returns embed code for a mixcloud audio url', function() {
      var mixcloud = 'http://mixcloud.com/LuckyMe/25-jamie-vexd-sunday-walkman-mix/';
      var scope = nock('mixcloud.com').get('/oembed?format=json&url=http//mixcloud.com/artist/track').reply(200,
          { html: '<div><object width="300" height="300"><param name="movie" value="//www.mixcloud.com/media/' +
          'swf/player/mixcloudLoader.swf?feed=http%3A%2F%2Fwww.mixcloud.com%2Flazykiki%2Fode-to-concrete%2F&amp;' +
          'embed_uuid=c40faa22-7805-46e6-9a5a-563b12de0f86&amp;stylecolor=&amp;embed_type=widget_standard">' +
          '</param><param name="allowFullScreen" value="true"></param><param name="wmode" value="opaque"></param>' +
          '<param name="allowscriptaccess" value="always"></param><embed src="//www.mixcloud.com/media/swf/player/' +
          'mixcloudLoader.swf?feed=http%3A%2F%2Fwww.mixcloud.com%2Flazykiki%2Fode-to-concrete%2F&amp;embed_uuid=' +
          'c40faa22-7805-46e6-9a5a-563b12de0f86&amp;stylecolor=&amp;embed_type=widget_standard" type="application/' +
          'x-shockwave-flash" wmode="opaque" allowscriptaccess="always" allowfullscreen="true" width="300" height="' +
          '300"></embed></object><div style="clear:both; height:3px;"></div><p style="display:block; font-size:12px; ' +
          'font-family:Helvetica, Arial, sans-serif; margin:0; padding: 3px 4px; color:#999;"><a href="http://www.' +
          'mixcloud.com/lazykiki/ode-to-concrete/?utm_source=widget&amp;amp;utm_medium=web&amp;amp;utm_campaign=base_' +
          'links&amp;amp;utm_term=resource_link" target="_blank" style="color:#02a0c7; font-weight:bold;">Ode to ' +
          'Concrète</a><span> by </span><a href="http://www.mixcloud.com/lazykiki/?utm_source=widget&amp;amp;utm_' +
          'medium=web&amp;amp;utm_campaign=base_links&amp;amp;utm_term=profile_link" target="_blank" style="' +
          'color:#02a0c7; font-weight:bold;">Lazy Kiki</a><span> on </span><a href="http://www.mixcloud.com/' +
          '?utm_source=widget&amp;utm_medium=web&amp;utm_campaign=base_links&amp;utm_term=homepage_link" ' +
          'target="_blank" style="color:#02a0c7; font-weight:bold;"> Mixcloud</a></p><div style="clear:both; ' +
          'height:3px;"></div></div>' });
      webRemix.generate(mixcloud, function(err, subject) {
        subject.should.equal('<div class="object-wrapper"><div class="object-wrapper"><div><object width="300" height="300"><param name="movie" ' +
          'value="//www.mixcloud.com/media/swf/player/mixcloudLoader.swf?feed=http%3A%2F%2Fwww.mixcloud.com%2F' +
          'lazykiki%2Fode-to-concrete%2F&amp;embed_uuid=2a3c7546-7bd1-482b-809c-0a0fa0f39095&amp;stylecolor=&amp;' +
          'embed_type=widget_standard"></param><param name="allowFullScreen" value="true"></param><param ' +
          'name="wmode" value="opaque"></param><param name="allowscriptaccess" value="always"></param>' +
          '<embed src="//www.mixcloud.com/media/swf/player/mixcloudLoader.swf?feed=http%3A%2F%2Fwww.mixcloud.com%2F' +
          'lazykiki%2Fode-to-concrete%2F&amp;embed_uuid=2a3c7546-7bd1-482b-809c-0a0fa0f39095&amp;stylecolor=&amp;embed_' +
          'type=widget_standard" type="application/x-shockwave-flash" wmode="opaque" allowscriptaccess="always" ' +
          'allowfullscreen="true" width="300" height="300"></embed></object><div style="clear:both; height:3px;">' +
          '</div><p style="display:block; font-size:12px; font-family:Helvetica, Arial, sans-serif; margin:0; ' +
          'padding: 3px 4px; color:#999;"><a href="http://www.mixcloud.com/lazykiki/ode-to-concrete/?utm_source=' +
          'widget&amp;amp;utm_medium=web&amp;amp;utm_campaign=base_links&amp;amp;utm_term=resource_link" ' +
          'target="_blank" style="color:#02a0c7; font-weight:bold;">Ode to Concrète</a><span> by </span>' +
          '<a href="http://www.mixcloud.com/lazykiki/?utm_source=widget&amp;amp;utm_medium=web&amp;amp;utm_' +
          'campaign=base_links&amp;amp;utm_term=profile_link" target="_blank" style="color:#02a0c7; ' +
          'font-weight:bold;">Lazy Kiki</a><span> on </span><a href="http://www.mixcloud.com/?utm_source=' +
          'widget&amp;utm_medium=web&amp;utm_campaign=base_links&amp;utm_term=homepage_link" target="_blank" ' +
          'style="color:#02a0c7; font-weight:bold;"> Mixcloud</a></p><div style="clear:both; height:3px;">' +
          '</div></div></div></div>');
      });
    });

    it('returns oembed code for a soundcloud url', function() {
      var soundcloud = 'http://soundcloud.com/skeptical/sets/tracks-576/';
      var scope = nock('soundcloud.com').get('/oembed?format=json&url=http//soundcloud.com/track').reply(200,
          { html: '<iframe src="//w.soundcloud.com/player/?url=http%3A' +
          '%2F%2Fapi.soundcloud.com%2Fplaylists%2F723408&amp;show_artwork=true" frameborder="no" height="450" ' +
          'scrolling="no" width="100%"></iframe><a class="media-link" target="_blank"' +
          'href="http://soundcloud.com/skeptical/sets/tracks-576/">http://soundcloud.com/skeptical/sets' +
          '/tracks-576/</a><a href="http://soundcloud.com/skeptical/sets/tracks-576/" target="_blank" class="media-off" ' +
          '>http://soundcloud.com/skeptical/sets/tracks-576/</a>' });
      webRemix.generate(soundcloud, function(err, subject) {
        subject.should.equal('<div class="object-wrapper"><iframe width="100%" height="450" scrolling="no" frameborder="no" ' +
          'src="//w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F723408&show_artwork=true">' +
          '</iframe></div>');
      });
    });

    it('returns embed code for a rd.io short url', function(done) {
      var rdio = 'http://rd.io/i/QVME9DdeW1GL';
      webRemix.generate(rdio, function(err, subject) {
        subject.should.equal('<div class="object-wrapper"><iframe class="rdio" width="525" height="295" ' +
          'src="//rd.io/i/QVME9DdeW1GL" frameborder="0"></iframe></div>');
        done();
      });
    });

    it('returns embed code for a rdio normal url', function(done) {
      var rdio = 'http://rdio.com/x/QVME9DdeW1GL';
      webRemix.generate(rdio, function(err, subject) {
        subject.should.equal('<div class="object-wrapper"><iframe class="rdio" width="525" height="295" ' +
          'src="//rd.io/i/QVME9DdeW1GL" frameborder="0"></iframe></div>');
        done();
      });
    });

    it('returns embed code for a rdio normal url with a custom width and height', function(done) {
      var rdio = 'http://rdio.com/x/QVME9DdeW1GL';
      webRemix.generate(rdio, { width: 600, height: 100 }, function(err, subject) {
        subject.should.equal('<div class="object-wrapper"><iframe class="rdio" width="600" height="100" ' +
          'src="//rd.io/i/QVME9DdeW1GL" frameborder="0"></iframe></div>');
        done();
      });
    });

    it('returns a regular link', function() {
      var link = 'http://poop.com';
      var scope = nock('poop.com').get('http://poop.com').reply(200,
          { html: '<a href="http://poop.com">http://poop.com</a>' });
      webRemix.generate(link, function(err, subject) {
        subject.should.equal('<a href="http://poop.com">http://poop.com</a>');
      });
    });

    it('returns image code for an instagr.am url', function() {
      var instagram = 'http://instagram.com/p/QFJJzTw8yS/';
      webRemix.generate(instagram, function(err, subject) {
        subject.should.equal('<div class="image-wrapper"><a href="http://instagram.com/p/QFJJzTw8yS/">' +
          '<img src="http://instagr.am/p/QFJJzTw8yS/media/"/></a></div>');
      });
    });

    it('returns a mix of text and links', function() {
      var mix = 'http://instagram.com/p/QFJJzTw8yS/ bunnies';
      webRemix.generate(mix, function(err, subject) {
        subject.should.equal('<div class="image-wrapper"><a href="http://instagram.com/p/QFJJzTw8yS/">' +
          '<img src="http://instagr.am/p/QFJJzTw8yS/media/"/></a></div> bunnies');
      });
    });
  });
});
