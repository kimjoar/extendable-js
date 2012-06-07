buster.spec.expose();

describe("extendable", function () {
    it("is defined", function() {
        expect(extendable).toBeDefined();
    });

    it("mixes in extend", function() {
      var Parent = function() {};

      extendable.call(Parent);

      expect(Parent.extend).toBeDefined();
    });

    it("calls Parent constructor when initialized", function() {
      var Parent = this.spy();

      extendable.call(Parent);

      var Child = Parent.extend();
      expect(Parent).not.toHaveBeenCalled();

      new Child();
      expect(Parent).toHaveBeenCalledOnce();
    });

    it("inherits class properties from Parent", function() {
      var Parent = function() {};
      Parent.test = {};

      extendable.call(Parent);

      var Child = Parent.extend();
      expect(Child.test).toBeDefined();
    });

    it("inherits instance properties from Parent", function() {
      var Parent = function() {};
      Parent.prototype.test = {};

      extendable.call(Parent);

      var Child = Parent.extend();
      var child = new Child();

      expect(child.test).toBeDefined();
    });

    it("adds passed instance properties", function() {
      var Parent = function() {};

      extendable.call(Parent);

      var Child = Parent.extend({
        test: function() {}
      });
      var child = new Child();

      expect(child.test).toBeDefined();
    });

    it("adds passed static properties", function() {
      var Parent = function() {};

      extendable.call(Parent);

      var Child = Parent.extend({}, {
        test: function() {}
      });

      expect(Child.test).toBeDefined();
    });

    it("enable children to create new classes", function() {
      var Parent = function() {};

      extendable.call(Parent);

      var Child = Parent.extend();

      expect(Child.extend).toBeDefined();
    });

    it("sets up the proper prototype chain to inherit from parent", function() {
      var Parent = function() {};

      extendable.call(Parent);

      var Child = Parent.extend({
        test: function() {}
      }, {
        test: function() {}
      });

      var GrandChild = Child.extend();
      expect(GrandChild.test).toBeDefined();

      var grandChild = new GrandChild();
      expect(grandChild.test).toBeDefined();

      Child.prototype.test2 = function() {};
      expect(grandChild.test2).toBeDefined();
    });
});
