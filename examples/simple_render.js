var     sys = require('sys'),
    javiary = require('../lib/javiary');

var fx = new javiary.Javiary('YOUR_KEY', 'YOUR_SECRET');
fx.upload('/path/to/file', function(result) {
    var backgroundColor = "0xFFFFFFFF",
        format = "jpg",
        quality = "100",
        scale = "1",
        width = "0",
        height = "0",
        filterId = "21",
        filepath = result.url;

    fx.render (backgroundColor, format, quality, scale, filepath, filterId, width, height, function(result) {
        sys.puts('rendered image at: ' + result.url);
    });
});

