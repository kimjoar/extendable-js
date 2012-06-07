// extendable.js v0.0.1
//
// extendable.js is a mixin to easily create a layered architecture. Let's say
// you want to have a view component, but you want all views to inherit from a
// parent, with the prototype chain properly set up. This can be done as follows:
//
//     var View = function() {
//       // constructor
//     }
//     View.prototype.instanceMethod = function() {
//       // instance method
//     }
//     extendable.call(View);
//
//     // Now new views can be created using `extend`:
//
//     var UserView = View.extend({
//       someMethod: function() {
//         // an example of an instance method
//       }
//     }, {
//       someStaticMethod: function() {
//         // an example of a static method
//       }
//     });
//
// extendable.js is based on [Backbone.js](http://backbonejs.org/)
//
// Copyright 2012, Kim Joar Bekkelund MIT Licensed

var extendable = (function($) {

  var ctor = function(){};

  var extend = function(properties, staticProperties) {
    var parent = this;

    // Create child constructor
    var child = function() {
      // … which only job is to call the parent construtor with all
      // the arguments
      parent.apply(this, arguments);
    };

    // Inherit class (static) properties from parent.
    $.extend(child, parent);

    // Set the prototype chain to inherit from `parent`
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties, i.e. instance properties
    if (properties) $.extend(child.prototype, properties);

    // Add static properties, i.e. class properties
    if (staticProperties) $.extend(child, staticProperties);

    // Correctly set child's prototype.constructor.
    child.prototype.constructor = child;

    // The child must also be able to create new subclasses
    child.extend = parent.extend;

    return child;
  };

  return function() {
    this.extend = extend;

    return this;
  };

})(jQuery);
