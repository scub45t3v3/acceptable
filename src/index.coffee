_ = require 'underscore'
mime = require 'mime'
debug = require('debug') 'acceptable'

acceptable = (accept...) ->
  debug 'Start building acceptable middleware'
  accept = _.flatten accept
  debug 'Acceptable parameters %o', accept

  accept = _.map accept, (value) ->
    if !_.isString(value)
      debug 'Invalid extension or mime/type of %o', value

      throw new TypeError 'Invalid extension or mime/type provided'
    else if value?.trim?()?.match?(/^[\w-]+\/[\w\.\+-]+$/)
      return value.trim().toLowerCase()
    else if value?.trim?()?.match?(/^[\w-]+$/)
      return mime.getType value.trim().toLowerCase()

  if !accept.length
    accept.push '*/*'

  debug 'Done building acceptable middleware using mime/type of %o', accept

  return (req, res, next) ->
    debug 'Executing acceptable middleware'
    if req.accepts(accept)
      debug 'URL %s accepts %s', req.url, req.headers.accept

      return next()

    error = new Error()
    error.code = 406
    error.status = 'Not Acceptable'
    error.message = 'The requested document can not be provided as '
    error.message += req.headers.accept

    debug 'URL %s does not accept %s', req.url, req.headers.accept

    return next error

module.exports = acceptable
