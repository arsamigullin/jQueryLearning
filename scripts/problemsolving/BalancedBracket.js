define(function (require, factory) {
    'use strict';
    var brackets = "{[()}"
    debugger;
    var stack = [];
    for (let i = 0; i < brackets.length; i++) {
        let bracket = brackets[i];
        if (bracket==='{' || bracket==='[' || bracket ==='('){
            stack.push(bracket);
        }
        else{
            let prevBracket = stack.pop();
            if (!prevBracket) {
                return false;
            }
            if (getAppropriateBracket(prevBracket)!== bracket)  {
                return false;
            }
        }
    }

    if (stack.length>0) return false;

    function getAppropriateBracket(bracket){
        switch (bracket) {
            case '{': return '}';
            case '(': return ')';
            case '[': return ']';
        }
    }
});

