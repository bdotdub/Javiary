
                      ------
          .---.__   < Javiary >
         /  /6|__\    ------
         \  \/--`  _/
         ,) (,
        //   \\   Aviary FX API for node.js
       {(     )}
    ----""---""---------------
         |||||
          |||
           |

# Javiary

  A quick and dirty node.js library to access the Aviary FX API. This
  is largely a port of their [RubyGem](http://developers.aviary.com/effects-documentation-ruby).

     var javiary = require('javiary')
     var fx = new javiary.Javiary('YOUR_KEY', 'YOUR_SECRET')

    var backgroundColor = "0xFFFFFFFF",
        format = "jpg",
        quality = "100",
        scale = "1",
        width = "0",
        height = "0",
        filterId = "21",
        filepath = "/path/to/file"

    fx.render (backgroundColor, format, quality, scale, filepath, filterId, width, height, function(result) {
        sys.puts('rendered image at: ' + result.url);
    });

## Installation

    $ npm install javiary

## Examples

  There is currently one example in the `examples/` directory. You
  will have to edit the file with your Aviary API keys and the path
  to the file you want to change.

    $ cd examples/
    $ vim simple_render.js # or whatever you edit with
    $ node simple_render.js

## TODO

A lot :) The library currently does *NOT* implement the Render
Options Grid, Render Parameters. Any help would be much appreciated
(and node.js convention critiques!)

Also, no tests :(

## Contributors

  * Benny Wong ([bdotdub](http://github.com/bdotdub))

## License

Check LICENSE file (it's the MIT license)
