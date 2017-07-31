define(function (require, factory) {
    'use strict';
    // !!!
    // Used inside a function, this refers to the current object. What that actually means is specified by the way in which you called that function. 
    // If you called it using dot notation or bracket notation on an object, that object becomes this
    function makePerson(first, last) {
        return {
            first: first,
            last: last,
            fullname: function () {
                return this.first + ' ' + this.last;
            },
            fullnameReversed: function () {
                return this.last + ' , ' + this.first
            }
        }
    }
    debugger;
    var s = makePerson('Simon', 'Willson');
    alert(s.fullname());
    alert(s.fullnameReversed());

    // When we call fullName() alone, without using s.fullName(), 
    // this is bound to the global object. Since there are no global variables called first or last we get undefined for each one.
    var fullname = s.fullname;
    alert(fullname());
});