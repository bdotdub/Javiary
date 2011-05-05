// Convenience methods ripped from backbone.js

exports.extend = function(target) {
     var i = 1, length = arguments.length, source;
     for ( ; i < length; i++ ) {
         // Only deal with defined values
         if ( (source = arguments[i]) != undefined ) {
             Object.getOwnPropertyNames(source).forEach(function(k){
                                                            var d = Object.getOwnPropertyDescriptor(source, k) || {value:source[k]};
                                                            if (d.get) {
                                                                target.__defineGetter__(k, d.get);
                                                                if (d.set) target.__defineSetter__(k, d.set);
                                                            }
                                                            else if (target !== d.value) {
                                                                target[k] = d.value;
                                                            }
                                                        });
         }
     }
     return target;
 };


// Create a (shallow-cloned) duplicate of an object.
exports.clone = function(obj) {
    if (Array.isArray(obj)) return obj.slice(0);
    return exports.extend({}, obj);
};
