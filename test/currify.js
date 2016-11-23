'use strict';

const currify = require('..');
const test = require('tape');

test('should call function', t => {
    const fn = () => 'done';
    const result = currify(fn);
    
    t.equal(result, 'done', 'shold return result');
    t.end();
});

test('call returned function', t => {
    const sum = (a, b, c) => a + b + c;
    
    const inc  = currify(sum, 1);
    const inc2 = inc(1);
    const inc3 = inc2(1);
    
    t.equal(typeof inc2, 'function', 'shold return function');
    t.equal(inc3, 3, 'shold return result');
    
    t.end();
});

test('no arguments', t => {
    t.throws(currify, /fn should be function!/, 'should throw when no fn');
    t.end();
});

test('arguments: wrong type', t => {
    const fn  = () => currify(1);
   
    t.throws(fn, /fn should be function/, 'shoud throw when wrong type');
    t.end();
});
