var Filter = exports.Filter = function() {

}

var FilterInfo = exports.FilterInfo = function() {
    this.description = null;
    this.label = null;
    this.uid = null;

    this.parameters = [];
}

FilterInfo.prototype.populateFromXml = function(xmlNode) {
    this.description = xmlNode.get('description').text();
    this.label = xmlNode.attr('label').value();
    this.uid = xmlNode.attr('uid').value();

    var parameters = xmlNode.find('filtermetadata/parameter');
    var filterParameters = [];
    for (var index in parameters) {
        var filterParameter = new FilterParameter()
        filterParameter.populateFromXml(parameters[index]);
        filterParameters.push(filterParameter);
    }
    this.parameters = filterParameters;
}

var FilterParameter = exports.FilterParameter = function(options) {
    this.id = null;
    this.max = null;
    this.min = null;
    this.type = null;
    this.uid = null;
    this.value = null;
    this.raw_attributes = options;
}

FilterParameter.prototype.populateFromXml = function(xmlNode) {
    var attributes = xmlNode.attrs();
    for (var index in attributes) {
        var attribute = attributes[index];
        this[attribute] = xmlNode.attr(attribute);
    }
}
