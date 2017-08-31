/**
 * @file mock api 中间件
 */

const fs = require('fs');
const path = require('path');
const load = require('./load');


// module.exports = function (req, res, next) {
//     let mockResponse;
//     try {
//         mockResponse = requireOnce(path.resolve(config.mockroot + req.path)) || {};
//         // 函数式接口
//         if (typeof mockResponse === 'function') {
//             mockResponse = mockResponse(req, res, next);
//         }
//         // json数据
//         else if (!mockResponse) {
//             throw {
//                 code: 100,
//                 msg: ''
//             }
//         }
//         // mock 转发后端接口
//         if (mockResponse.fallback === true) {
//            return next();
//         }
//         else {
//             res.mockResponse(mockResponse);
//         }
//     } catch (e) {
//         next();
//     }
// };