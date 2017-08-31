/**
 * load a node module only once and then clear the cache
 * @author  YernSun<yernsun@gmail.com>
 * @file    once.js
 * @version 1.0
 */

const fs = require('fs');

const addListener = (function () {
    let map = {};
    return function (absolutePath) {
        if (!map[absolutePath]) {
            // clear node module cache while it has been modified
            fs.watchFile(absolutePath, () => {
                if (require.cache[absolutePath]) {
                    delete require.cache[absolutePath];
                }
            });
        }
    }
})();

class Loader extends require('events') {
    constructor(config = {}) {
        super();
        this._map = {};
        this.config(config);
    }
    /**
     * config the loader
     * @param {object} config 
     */
    config(config = {}) {
        this._config = this._config || {};
        // Object.assign(this._config, config);
        this._config = {
            ...this._config,
            ...config
        };
        return this.load.bind(this);
    }

    load(id) {
        let absPath;
        try {
            absPath = require.resolve(id);
        } catch (error) {

        }
        this._cacheControl(absPath);
        let current;
        try {
            current = require(absPath);
        } catch (e) {

        }
        this.emit('load', {
            path: absPath,
            module: current,
            id
        });

        return current;
    }
    _cacheControl(absolutePath) {
        if (!this._config.cache === true) {
            delete require.cache[absolutePath];
        }
        // clear cache lasy
        else if (!this._map[absolutePath]) {
            this._map[absolutePath] = true;
            // clear node module cache while it has been modified
            fs.watchFile(absolutePath, () => {
                if (require.cache[absolutePath]) {
                    console.log('delete cache');
                    this.emit('load', {
                        path: absPath
                    });
                    delete require.cache[absolutePath];
                }
            });
        }
    }
}

export default Loader;
// module.exports = Loader;

// module.exports = function (id) {
//     const absPath = require.resolve(id);
//     addListener(absPath);
//     let current;
//     try {
//         current = require(absPath);
//     } catch (e) {

//     }
//     return current;
// }