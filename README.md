# Webremix

## What it is

Converts your media urls and links to embedded HTML.

## Installation

    npm install webremix

## How to Use

    var remix = require('webremix');

    remix.generate('http://amazinggifs.com/cats.gif look at these amazing cats!', function(err, resp) {
        console.log(resp);
    });

Output becomes:

    <img src="http://amazinggifs.com/cats.gif"> look at these amazing cats!

## Supported media

* Regular links (http://whatever.org or whatever.org)
* Links with image extensions of jpg|gif|png|jpeg
* Instagram urls
* Youtube urls
* Vimeo urls
* Soundcloud urls (will fall back to a regular link if the author has sharing disabled)
* Rdio urls
* Mixcloud urls

## Testing

    make test
