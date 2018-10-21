'use strict';

(() => {
  // include dependencies
  const _ = require('underscore');
  const mime = require('mime');
  const debug = require('debug')('@scuba-squad:acceptable');

  const acceptable = (...accept) => {
    debug('build:acceptable(%o)', accept);
    accept = _.flatten(accept);

    accept = _.map(accept, (value) => {
      value = value && (value.toString() || `${value}`).trim().toLowerCase();
      const ext = mime.getExtension(value);
      const type = mime.getType(value);

      if (ext) {
        return value;
      } else if (type) {
        return type;
      }

      debug('error:Invalid extension or mime/type of %o', value);

      throw new TypeError('Invalid extension or mime/type provided');
    });

    // empty accept so allow any mime/type
    if (!accept.length) {
      accept.push('*/*');
    }

    debug('build:acceptable mime/type = %o', accept);

    return (req, res, next) => {
      debug('call:acceptable(req, res, next)');

      if (req.accepts(accept)) {
        debug('success:URL %s accepts %s', req.url, req.headers.accept);

        return next();
      }

      const error = new Error();
      error.code = 406;
      error.status = 'Not Acceptable';
      error.message = `The requested document can not be provided as ${req.headers.accept}`;

      debug('error:URL %s does not accept %s', req.url, req.headers.accept);

      return next(error);
    };
  };

  // export middleware as commonjs module
  module.exports = acceptable;
})(); // end IIFE