// extendable.js v0.1.0
//
// extendable.js is a mixin used to easily create a layered architecture.
//
// The code follows a functional mixins pattern described by Angus Croll in his
// [article on JavaScript mixins](http://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/).
//
// Usage
// -----
//
// In browsers include a single JavaScript file:
//
//     <script src="extendable-0.1.0.js"></script>/
//
// Example usage
// -------------
//
// Define the constructor which will make use of extendable:
//
//     var View = function() {
//       // constructor
//     }
//
// This constructor will be called whenever a child is initialized.
//
// You can then add class and instance properties to your parent using regular
// JavaScript:
//
//     View.classProperty = function() {};
//
//     View.prototype.instanceProperty = function() {}
//
// Add (mixin) extendable functionality to `View`:
//
//     extendable.call(View);
//
// `View` will now have access to an `extend` method, which can be used to
// create new components, optionally passing instance and class properties:
//
//     var UserView = View.extend({
//       instanceTest: function() {
//         // an example of an instance property
//       }
//     }, {
//       classTest: function() {
//         // an example of a class property
//       }
//     });
//
// This class can now be initialized:
//
//     var view = new UserView();
//
// And we can call properties on the newly created instance:
//
//     view.instanceTest();
//
// We can also call properties available on the parent:
//
//     view.instanceProperty();
//
// Inspiration
// -----------
//
// extendable.js is based on [Backbone.js](http://backbonejs.org/) and
// [Underscore.js](http://underscorejs.org/).
//
// About
// -----
//
// Copyright 2012, Kim Joar Bekkelund MIT Licensed

var extendable = (function() {

  // Helper method to add all the properties of passed-in object(s) to a
  // given object
  var add = function(obj) {
    var objects = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, l = objects.length; i < l; i++) {
      var source = objects[i];
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }

    return obj;
  };

  // Shared empty constructor function to aid in prototype-chain creation.
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
    add(child, parent);

    // Set the prototype chain to inherit from `parent`
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties, i.e. instance properties
    if (properties) add(child.prototype, properties);

    // Add static properties, i.e. class properties
    if (staticProperties) add(child, staticProperties);

    // Correctly set child's prototype.constructor.
    child.prototype.constructor = child;

    // The child must also be able to create new subclasses
    child.extend = parent.extend;

    return child;
  };

  // The public api
  return function() {
    this.extend = extend;
    return this;
  };

})();
