'use strict';

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = '3000';

app.set('port', port);

// view engine setup
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use('/crawl', _index2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, _httpErrors2.default)(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

/**
 * Create HTTP server.
 */

var server = _http2.default.createServer(app);

/**
 * Listen on provided port.
 */

server.listen(port);
//# sourceMappingURL=app.js.map