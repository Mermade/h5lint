'use strict';

var xml = require('jgexml');

function lintStr(s) {
    var lastElement = '*';
    var stack = [];
    stack.push('*');
    var voidElements = ['area', 'base', 'br', 'col','embed','hr', 'img','input', 'keygen','link', 'meta',
        'param','source','track','wbr'];
    xml.parse(s,function(state,token) {
        if (state == xml.sElement) {
            if (voidElements.indexOf(token)<0) {
                stack.push(token);
                lastElement = token;
            }
        }
        else if (state == xml.sEndElement) {
            if (stack.length <= 0) {
                console.log('Warning: too many closing elements, </'+token+'>');
            }
            var e = stack.length > 0 ? stack.pop() : '?';
            if (token != e) {
                console.log('Warning: unclosed <'+e+'> element, got </'+token+'> last: <'+lastElement+'>');
            }
        }
        else if (state == xml.sError) {
            console.log('Error at '+token);
        }
    });
    while (stack.length > 1) {
        var e = stack.pop();
        console.log('Warning: premature end of file, unclosed <'+e+'> element, last: <'+lastElement+'>');
    }
    if (stack.length != 1) {
        console.log('eek');
    }
}

module.exports = {
    lintStr : lintStr
};