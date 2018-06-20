'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('events');

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var event = new _events.EventEmitter();

/**
 * Async queue which is a queue of processUrl tasks, concurrency is 3 (Chose a random concurrency level).
 */
var queue = _async2.default.queue(function (task, callback) {
    callback();
}, 3);

var visitedUrls = void 0;
var skippedUrls = void 0;
var errorUrls = void 0;
var pagesObj = [];

/**
 * urlProcssed event: The event decides where to put the url that is being processed and also pushes the links
 * in the queue for further processing. The event receives processedUrl and its linkedUrls and decides whether
 * the url belongs in the visitedUrls or skippedUrls list.
 */

event.on('urlProcessed', function (processedUrl, linkedUrls) {

    visitedUrls.add(processedUrl);

    linkedUrls.forEach(function (link) {
        if (skippedUrls.has(link)) {
            return;
        } else if (visitedUrls.has(link)) {
            skippedUrls.add(link);
            return;
        }
        queue.push(processUrl(link), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
});

/**
 * Error event: adds the url to errorUrls set.
 */

event.on('inError', function (url) {
    console.log("processing error: " + url);
    errorUrls.add(url);
});

/**
 * This function received the object to be crawled and provides a callback to fetch the result.
 * @param callback
 * @param pages
 */

var crawl = function crawl(callback, pages) {
    /**
     * @type {Set<any>} Initialize separate sets for success, skipped and error cases.
     */
    visitedUrls = new Set();
    errorUrls = new Set();
    skippedUrls = new Set();

    pagesObj = pages;

    /**
     * Start processing with the first url of the input array.
     */
    queue.push(processUrl(pagesObj[0].address), function (err) {
        if (err) {
            console.log(err);
        }
    });

    callback(visitedUrls, skippedUrls, errorUrls);
};

/**
 * Function to process a given url, this function accepts the "Address" of the url.
 * The function emits "urlProcessed" or "inError" events depending on whether there is an object in the input array for
 * the given url.
 * @param url
 */
var processUrl = function processUrl(url) {

    console.log("Processing Url: ", url);

    var page = pagesObj.find(function (page) {
        return page.address === url;
    });

    if (!!page) {
        event.emit('urlProcessed', page.address, page.links);
    } else {
        event.emit('inError', url);
    }
};

exports.default = crawl;
//# sourceMappingURL=crawl.js.map