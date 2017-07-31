define(function (require, factory) {
    'use strict';
    function Person(first, last) {
        this.first = first;
        this.last = last;
        this.fullname = function () {
            return this.first + ' ' + this.last;
        };
        this.fullnameReversed = function () {
            return this.last + ' , ' + this.first;
        }
    }
// We have introduced another keyword: new. new is strongly related to this. 
// It creates a brand new empty object, and then calls the function specified, with this set to that new object
// Notice though that the function specified with this does not return a value but merely modifies the this object. 
//It's new that returns the this object to the calling site. Functions that are designed to be called by new are called constructor functions.
// Common practice is to capitalize these functions as a reminder to call them with new.
    var s = new Person ('Simon', 'Wilson');
});