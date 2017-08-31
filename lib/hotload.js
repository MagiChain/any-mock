'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * load a node module only once and then clear the cache
 * @author  YernSun<yernsun@gmail.com>
 * @file    once.js
 * @version 1.0
 */

var fs = require('fs');

var addListener = function () {
    var map = {};
    return function (absolutePath) {
        if (!map[absolutePath]) {
            // clear node module cache while it has been modified
            fs.watchFile(absolutePath, function () {
                if (require.cache[absolutePath]) {
                    delete require.cache[absolutePath];
                }
            });
        }
    };
}();

var Loader = function (_require) {
    _inherits(Loader, _require);

    function Loader() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Loader);

        var _this = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this));

        _this._map = {};
        _this.config(config);
        return _this;
    }
    /**
     * config the loader
     * @param {object} config 
     */


    _createClass(Loader, [{
        key: 'config',
        value: function config() {
            var _config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this._config = this._config || {};
            // Object.assign(this._config, config);
            this._config = _extends({}, this._config, _config);
            return this.load.bind(this);
        }
    }, {
        key: 'load',
        value: function load(id) {
            var absPath = void 0;
            try {
                absPath = require.resolve(id);
            } catch (error) {}
            this._cacheControl(absPath);
            var current = void 0;
            try {
                current = require(absPath);
            } catch (e) {}
            this.emit('load', {
                path: absPath,
                module: current,
                id: id
            });

            return current;
        }
    }, {
        key: '_cacheControl',
        value: function _cacheControl(absolutePath) {
            var _this2 = this;

            if (!this._config.cache === true) {
                delete require.cache[absolutePath];
            }
            // clear cache lasy
            else if (!this._map[absolutePath]) {
                    this._map[absolutePath] = true;
                    // clear node module cache while it has been modified
                    fs.watchFile(absolutePath, function () {
                        if (require.cache[absolutePath]) {
                            console.log('delete cache');
                            _this2.emit('load', {
                                path: absPath
                            });
                            delete require.cache[absolutePath];
                        }
                    });
                }
        }
    }]);

    return Loader;
}(require('events'));

exports.default = Loader;
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