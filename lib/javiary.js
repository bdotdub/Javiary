var   filter = require('./filter'),
          fs = require('fs'),
     hashlib = require('hashlib'),
    libxmljs = require('libxmljs'),
        mime = require('mime'),
        rest = require ('restler'),
        util = require('./util');

var Javiary = exports.Javiary = function(key, secret) {
    this.key    = key;
    this.secret = secret;
}

Javiary.APP_VERSION      = "1.0"
Javiary.GET_FILTERS_URL  = "/filter/getFilters"
Javiary.GET_TIME_URL     = "/util/getTime"
Javiary.HARDWARE_VERSION = "1.0"
Javiary.PLATFORM         = "web"
Javiary.RENDER_URL       = "/ostrich/render"
Javiary.SERVER           = "http://cartonapi.aviary.com/services"
Javiary.SOFTWARE_VERSION = "Javascript"
Javiary.VERSION          = "0.2"
Javiary.UPLOAD_URL       = "/ostrich/upload"

Javiary.prototype.callApi = function(uri, params, callback) {
    params = util.extend(this.standardParams(), params);
    params['api_sig'] = this.getApiSignature(params);
    rest.post(uri, {
        data: params
    }).on('complete', function(data) {
        var response = Javiary.prototype.loadXmlResponse(data);
        callback(response);
    });
}

Javiary.prototype.getApiSignature = function(params) {
    var paramsString = '';
    var keys = [];
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    keys.sort()
    for (index in keys) {
        var key = keys[index];
        var value = params[key];
        paramsString += key + value;
    }
    var stringToBeMD5 = this.secret + paramsString;
    var apiSig = hashlib.md5(stringToBeMD5);
    return apiSig;
}

Javiary.prototype.getFilters = function(callback) {
    params = {}
    uri = Javiary.SERVER + Javiary.GET_FILTERS_URL

    this.callApi(uri, params, function(result) {
        var filters = []
        var filterElements = result.find('//filter')
        for (var index in filterElements) {
            var filterInfo = new filter.FilterInfo()
            filterInfo.populateFromXml(filterElements[index]);
            filters.push(filterInfo);
        }
        callback(filters);
    });
}

Javiary.prototype.getTime = function(params, callback) {
    params = {}
    uri = Javiary.SERVER + Javiary.GET_TIME_URL;
    this.callApi(uri, params, function(response) {
        var serverTime = response.get('//servertime').text();
        callback(serverTime);
    });
}

Javiary.prototype.loadXmlResponse = function(xmlString) {
    var xmlDoc = libxmljs.parseXmlString(xmlString);
    return xmlDoc;
}

// TODO Make parameter a hash
Javiary.prototype.render = function(backgroundColor, format, quality, scale, filepath, filterId, width, height, callback) {
    params = {
        'calltype': 'filteruse',
        'cols': '0',
        'rows': '0',
        'backgroundcolor': backgroundColor,
        'cellwidth': width,
        'cellheight': height,
        'filterid': filterId,
        'filepath': filepath,
        'quality': quality,
        'scale': scale,
        'format': format,
        'renderparameters': ''
    }

    uri = Javiary.SERVER + Javiary.RENDER_URL;
    this.callApi(uri, params, function(data) {
        var url = data.get('//ostrichrenderresponse/url').text();
        callback({ url: url });
    });
}

Javiary.prototype.standardParams = function() {
    params_hash = {}
    params_hash['api_key'] = this.key;
    params_hash['app_version'] = Javiary.APP_VERSION;
    params_hash['hardware_version'] = Javiary.HARDWARE_VERSION;
    params_hash['platform'] = Javiary.PLATFORM;
    params_hash['software_version'] = Javiary.SOFTWARE_VERSION;
    params_hash['ts'] = new Date().getTime().toString().substr(0, 10);
    params_hash['version'] = Javiary.VERSION;
    return params_hash;
}

Javiary.prototype.upload = function(filename, callback) {
    var self = this;
    var params = this.standardParams();

    params['api_sig'] = this.getApiSignature(params);
    fs.stat(filename, function(err, stat) {
        params['file'] = rest.file(filename, null, stat.size, null, mime.lookup(filename));

        rest.post(Javiary.SERVER + Javiary.UPLOAD_URL, {
            multipart: true,
            data: params
        }).on('complete', function(data) {
            var response = Javiary.prototype.loadXmlResponse(data);
            var url = response.get('//file').attr('url').value();
            callback({ url: url });
        }).on('error', function(error) {
        });;
    });
}
