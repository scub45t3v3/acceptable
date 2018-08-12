'use strict';

(() => {
  // include dependencies
  const _ = require('underscore');
  const mime = require('mime');
  const debug = require('debug')('acceptable');

  const acceptable = (...accept) => {
    debug('Start building acceptable middleware');
    accept = _.flatten(accept);
    debug('Acceptable parameters %o', accept);

    accept = _.map(accept, (value) => {
      value = value && (value.toString() || `${value}`).trim().toLowerCase();
      const ext = mime.getExtension(value);
      const type = mime.getType(value);

      if (ext) {
        return value;
      } else if (type) {
        return type;
      }

      debug('Invalid extension or mime/type of %o', value);

      throw new TypeError('Invalid extension or mime/type provided');
    });

    // empty accept so allow any mime/type
    if (!accept.length) {
      accept.push('*/*');
    }

    debug('Done building acceptable middleware using mime/type of %o', accept);

    return (req, res, next) => {
      debug('Executing acceptable middleware');

      if (req.accepts(accept)) {
        debug('URL %s accepts %s', req.url, req.headers.accept);

        return next();
      }

      const error = new Error();
      error.code = 406;
      error.status = 'Not Acceptable';
      error.message = `The requested document can not be provided as ${req.headers.accept}`;

      debug('URL %s does not accept %s', req.url, req.headers.accept);

      return next(error);
    };
  };

  // export middleware as commonjs module
  module.exports = acceptable;
})(); // end IIFE