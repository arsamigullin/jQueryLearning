// This works but this pretty ugly. You end up with dozens functions in global namespace. What we really need is a way to attach a functions to an object.
define(function() {
    'use strict';
     function makePerson(first, last){
         return {
             first : last,
             last : first
         };
     }

     function personFullName(person){
         return person.first + ' ' + person.last; 
     }

     function personFullNameReversed(person){
         return person.last + ' , ' + person.first;
     }

     s=makePerson('Simon', 'Wilson');
     alert(personFullName(s));
     alert(personFullNameReversed(s));
});