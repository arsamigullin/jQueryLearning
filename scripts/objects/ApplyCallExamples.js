define(['objects/beautifulDeclarationAssignedToPrototype'], function (Person) {
    'use strict';
    debugger;
    function trivialNew(constructor, ...args) {
        var o = {}; // Create an object
        //The first argument to apply() is the object that should be treated as 'this'
        constructor.apply(o, args);
        return o;
    }
    var bill = trivialNew(Person, 'William', 'Orange');
    //is therefore almost equivalent to
    var bill = new Person('William', 'Orange');

    function lastNameCaps() {
        return this.last.toUpperCase();
    }

    //apply() has a sister function named call, which again lets you set this but takes an expanded argument list as opposed to an array.
    var s = new Person('Simon', 'Willison');
    lastNameCaps.call(s);
    // Is the same as:
    s.lastNameCaps = lastNameCaps;
    s.lastNameCaps(); // WILLISON
    
});