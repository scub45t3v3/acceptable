unit = require 'unit.js'
express = require 'express'
acceptable = require '../index'

app = express()
app.use acceptable('json', 'txt')

app.get '/test', (req, res, next) ->
  res.format
    'json': ->
      res
        .status 200
        .send req.headers
    'default': ->
      res
        .status 200
        .send req.headers.accept

app.use (err, req, res, next) ->
  res
    .status 406
    .send 'Not Acceptable'

describe '#acceptable', ->
  it 'should accept an argument list of extensions', ->
    test = acceptable 'json', 'txt', 'html', 'jpeg', 'xml'
    unit
      .function test

    return null

  it 'should accept an array of extensions', ->
    test = acceptable ['json', 'txt', 'html', 'jpeg', 'xml']
    unit
      .function test

    return null

  it 'should accept an argument list of mime types', ->
    test = acceptable 'application/json', 'application/javascript', 'text/plain'
    unit
      .function test

    return null

  it 'should accept an array of mime types', ->
    test = acceptable ['application/json', 'application/javascript', 'text/plain']
    unit
      .function test

    return null

  it 'should accept an argument list of extensions or mime types', ->
    test = acceptable 'json', 'application/js', 'xml', 'text/plain'
    unit
      .function test

    return null

  it 'should accept an array of extensions or mime types', ->
    test = acceptable ['json', 'application/js', 'xml', 'text/plain']
    unit
      .function test

    return null

  it 'should accept an argument list that contain arrays', ->
    test = acceptable 'js', ['application/json', 'xml'], 'text/plain'
    unit
      .function test

    return null

  it 'should throw an error if any argument is not a string or array of strings', ->
    unit
      .error ->
        acceptable 5
      .error ->
        acceptable [5]
      .error ->
        acceptable 'js', 9
      .error ->
        acceptable ['js', 9]
      .error ->
        accpetable false
      .error ->
        acceptable /.*/
      .error ->
        acceptable _.noop
      .error ->
        acceptable {}

    return null

  it 'should preform content negotiation', (done) ->
    unit
      .httpAgent app
      .get '/test'
      .set 'Accept', 'application/json'
      .expect 200
      .end (err, res) ->
        return !res.body

    unit
      .httpAgent app
      .get '/test'
      .set 'Accept', 'application/xml'
      .expect 406
      .end done

    return null
