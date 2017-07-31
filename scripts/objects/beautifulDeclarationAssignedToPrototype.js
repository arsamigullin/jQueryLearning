define(function (require, factory) {
    'use strict';
    function Person(first, last) {
        this.first = first;
        this.last = last;
    }
    Person.prototype.fullName = function () {
        return this.first + ' ' + this.last;
    };
    Person.prototype.fullNameReversed = function () {
        return this.last + ', ' + this.first;
    };
//This is an incredibly powerful tool. JavaScript lets you modify something's 
//prototype at any time in your program, which means you can add extra methods to existing objects at runtime:
    var s = new Person('Simon', 'Willison');
    //s.firstNameCaps(); // TypeError on line 1: s.firstNameCaps is not a function

    Person.prototype.firstNameCaps = function firstNameCaps() {
        return this.first.toUpperCase();
    };
    s.firstNameCaps(); // "SIMON"
    return Person;
});