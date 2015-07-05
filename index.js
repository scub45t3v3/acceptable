(function() {
  var _, acceptable, exports, mime,
    slice = [].slice;

  _ = require('underscore');

  mime = require('mime');

  acceptable = function() {
    var accept;
    accept = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    accept = _.flatten(accept);
    accept = _.map(accept, function(value) {
      var ref, ref1;
      if (!_.isString(value)) {
        throw new TypeError('Invalid extension or mime/type provided');
      } else if (value != null ? typeof value.trim === "function" ? (ref = value.trim()) != null ? typeof ref.match === "function" ? ref.match(/^[\w-]+\/[\w-]+$/) : void 0 : void 0 : void 0 : void 0) {
        return value.trim().toLowerCase();
      } else if (value != null ? typeof value.trim === "function" ? (ref1 = value.trim()) != null ? typeof ref1.match === "function" ? ref1.match(/^[\w-]+$/) : void 0 : void 0 : void 0 : void 0) {
        return mime.lookup(value.trim().toLowerCase());
      }
    });
    if (!accept.length) {
      accept.push('*/*');
    }
    return function(req, res, next) {
      var error;
      if (req.accepts(accept)) {
        return next();
      }
      error = new Error();
      error.code = 406;
      error.status = 'Not Acceptable';
      error.message = 'The requested document can not be provided as ';
      error.message += req.headers.accept;
      return next(error);
    };
  };

  exports = module.exports = acceptable;

}).call(this);
