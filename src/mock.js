/**
 * mock service
 * @author  YernSun<yernsun@gmail.com>
 * @file    mock.js
 * @version 1.0
 */

const load = require('./hotload');

class Mock {
    static koa() {

    }
    static express(req, res, next) {}
    static node() {

    }
}

function Node(...args) {
    return new Mock(...args);
}



Node.create = Node;

Node.koa = function (config) {
    return async(ctx, next) => {
        await new Promise((resolve,reject)=>{
            
        });
    }
}

Node.express = function (config) {

}



module.exports = Node;