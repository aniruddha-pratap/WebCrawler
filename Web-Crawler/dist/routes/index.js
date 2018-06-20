'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crawl = require('./crawl');

var _crawl2 = _interopRequireDefault(_crawl);

var _express = require('express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* GET home page. */
router.get('/', function (req, res, next) {
    (0, _crawl2.default)(function (visitedUrls, skippedUrls, errorUrls) {
        console.log("hi");
    });
    res.send("Hello");
});

router.post('/', function (req, res, next) {
    var json_response = '';

    (0, _crawl2.default)(function (visitedUrls, skippedUrls, errorUrls) {
        json_response = { "success": Array.from(visitedUrls), "skipped": Array.from(skippedUrls), "error": Array.from(errorUrls) };
    }, req.body.pages);

    res.send(json_response);
});

exports.default = router;
//# sourceMappingURL=index.js.map