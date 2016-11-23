'use strict';

const tail = list => [].slice.call(list, 1);

module.exports = function currify(fn) {
    check(fn);
    
    const args = tail(arguments);
    
    if (args.length >= fn.length)
        return fn(...args);
    else
        return function() {
            return currify(...[fn, ...args, ...arguments]);
        };
}

function check(fn) {
    if (typeof fn !== 'function')
        throw Error('fn should be function!');
}
