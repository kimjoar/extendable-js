extendable.js
=============

Easily create a layered architecture in JavaScript.

Why?
----

I often want to share functionality between several components, e.g.
between views or between models. However, I don't always want to pull in
large libraries to have this functionality.

Usage
-----

With extendable.js I can create a function

```javascript
var View = function() {};
```

and then I can give it the `extend` method, so we can create new
components based on it:

```javascript
extendable.call(View);
```

Now we can create new components based on `View` by using `extend` and
optionally passing in instance properties and class properties:

```javascript
var UserView = View.extend({
  // all methods specified here will be instance methods on UserView

  showUser: function() {
    // logic for showing user
  }
}, {
  // and all methods specified in the second argument will be class
  // methods on UserView
});

// creating an instance
var userView = new UserView();
```

Now, if we add methods to `View` we can share these between all its
children:

```javascript
View.prototype.render = function() {
  // render template
}
```

When you create an instance of `UserView` it will have `render`
available.

In some cases you'll need some constructor functionality for your
components. This can easily be added to the function you mixin
extendable.js to. For example we can choose to always call `initialize`
when initializing a component based on `View`: 

```javascript
var View = function() {
  this.initialize();
}
View.prototype.initialize = function() {};
```

Now you can override `initialize` in components which extend the view.
