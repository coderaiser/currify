'use strict';

const currify = require('..');
const test = require('supertape');

test('should call function', (t) => {
    const fn = () => 'done';
    const result = currify(fn);
    
    t.equal(result, 'done', 'shold return result');
    t.end();
});

test('call returned function', (t) => {
    const sum = (a, b, c) => a + b + c;
    
    const inc = currify(sum, 1);
    const inc2 = inc(1);
    const inc3 = inc2(1);
    
    t.equal(typeof inc2, 'function', 'shold return function');
    t.equal(inc3, 3, 'shold return result');
    
    t.end();
});

test('function.length: 2', (t) => {
    const fn = currify((a, b, c) => {
        return a + b + c;
    });
    
    const sum = (f) => {
        if (f.length === 2)
            return f(2, 3);
        
        if (f.length === 1)
            return f();
    };
    
    const result = sum(fn(1));
    
    t.equal(result, 6, 'shold return result');
    
    t.end();
});

test('function.length: 3', (t) => {
    const fn = currify((a, b, c, d) => {
        return a + b + c + d;
    });
    
    const sum = (f) => {
        if (f.length === 3)
            return f(2, 3, 0);
        
        if (f.length === 1)
            return f();
    };
    
    const result = sum(fn(1));
    
    t.equal(result, 6, 'shold return result');
    
    t.end();
});

test('function.length: 4', (t) => {
    const fn = currify((a, b, c, d, e) => {
        return a + b + c + d + e;
    });
    
    const sum = (f) => {
        if (f.length === 4)
            return f(2, 3, 0, 0);
        
        if (f.length === 1)
            return f();
    };
    
    const result = sum(fn(1));
    
    t.equal(result, 6, 'shold return result');
    
    t.end();
});

test('function.length: 5', (t) => {
    const fn = currify((a, b, c, d, e, f) => {
        return a + b + c + d + e + f;
    });
    
    const sum = (f) => {
        if (f.length === 5)
            return f(2, 3, 0, 0, 1);
        
        if (f.length === 1)
            return f();
    };
    
    const result = sum(fn(1));
    
    t.equal(result, 7, 'shold return result');
    t.end();
});

test('no arguments', (t) => {
    t.throws(currify, /fn should be function!/, 'should throw when no fn');
    t.end();
});

test('arguments: wrong type', (t) => {
    const fn = () => currify(1);
    
    t.throws(fn, /fn should be function/, 'shoud throw when wrong type');
    t.end();
});

