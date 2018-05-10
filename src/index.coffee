_ = require 'underscore'
mime = require 'mime'

acceptable = (accept...) ->
  accept = _.flatten accept

  accept = _.map accept, (value) ->
    if !_.isString(value)
      throw new TypeError 'Invalid extension or mime/type provided'
    else if value?.trim?()?.match?(/^[\w-]+\/[\w\.\+-]+$/)
      return value.trim().toLowerCase()
    else if value?.trim?()?.match?(/^[\w-]+$/)
      return mime.getType value.trim().toLowerCase()

  if !accept.length
    accept.push '*/*'

  return (req, res, next) ->
    if req.accepts(accept)
      return next()

    error = new Error()
    error.code = 406
    error.status = 'Not Acceptable'
    error.message = 'The requested document can not be provided as '
    error.message += req.headers.accept

    return next error

module.exports = acceptable
