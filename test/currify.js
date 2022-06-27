'use strict';

const test = require('supertape');
const tryCatch = require('try-catch');

const currify = require('..');

test('currify: should call function', (t) => {
    const fn = () => 'done';
    const result = currify(fn);
    
    t.equal(result, 'done', 'shold return result');
    t.end();
});

test('currify: call returned function: function', (t) => {
    const sum = (a, b, c) => a + b + c;
    
    const inc = currify(sum, 1);
    const inc2 = inc(1);
    const inc3 = inc2(1);
    
    t.equal(typeof inc2, 'function', 'shold return function');
    t.end();
});

test('currify: call returned function: result', (t) => {
    const sum = (a, b, c) => a + b + c;
    
    const inc = currify(sum, 1);
    const inc2 = inc(1);
    const inc3 = inc2(1);
    
    t.equal(inc3, 3, 'shold return result');
    t.end();
});

test('currify: function.length: 2', (t) => {
    const fn = currify((a, b, c) => a + b + c);
    
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

test('currify: function.length: 3', (t) => {
    const fn = currify((a, b, c, d) => a + b + c + d);
    
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

test('currify: function.length: 4', (t) => {
    const fn = currify((a, b, c, d, e) => a + b + c + d + e);
    
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

test('currify: function.length: 5', (t) => {
    const fn = currify((a, b, c, d, e, f) => a + b + c + d + e + f);
    
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

test('currify: no arguments', (t) => {
    const [error] = tryCatch(currify);
    
    t.equal(error.message, 'fn should be function!', 'should throw when no fn');
    t.end();
});

test('currify: arguments: wrong type', (t) => {
    const [error] = tryCatch(currify, 1);
    
    t.equal(error.message, 'fn should be function!', 'shoud throw when wrong type');
    t.end();
});

