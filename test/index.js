(function() {
  var acceptable, app, express, unit;

  unit = require('unit.js');

  express = require('express');

  acceptable = require('../index');

  app = express();

  app.use(acceptable('json', 'txt'));

  app.get('/test', function(req, res, next) {
    return res.format({
      'json': function() {
        return res.status(200).send(req.headers);
      },
      'default': function() {
        return res.status(200).send(req.headers.accept);
      }
    });
  });

  app.use(function(err, req, res, next) {
    return res.status(406).send('Not Acceptable');
  });

  describe('#acceptable', function() {
    it('should accept an argument list of extensions', function() {
      var test;
      test = acceptable('json', 'txt', 'html', 'jpeg', 'xml');
      unit.function(test);
    });
    it('should accept an array of extensions', function() {
      var test;
      test = acceptable(['json', 'txt', 'html', 'jpeg', 'xml']);
      unit.function(test);
    });
    it('should accept an argument list of mime types', function() {
      var test;
      test = acceptable('application/json', 'application/javascript', 'text/plain');
      unit.function(test);
    });
    it('should accept an array of mime types', function() {
      var test;
      test = acceptable(['application/json', 'application/javascript', 'text/plain']);
      unit.function(test);
    });
    it('should accept an argument list of extensions or mime types', function() {
      var test;
      test = acceptable('json', 'application/js', 'xml', 'text/plain');
      unit.function(test);
    });
    it('should accept an array of extensions or mime types', function() {
      var test;
      test = acceptable(['json', 'application/js', 'xml', 'text/plain']);
      unit.function(test);
    });
    it('should accept an argument list that contain arrays', function() {
      var test;
      test = acceptable('js', ['application/json', 'xml'], 'text/plain');
      unit.function(test);
    });
    it('should throw an error if any argument is not a string or array of strings', function() {
      unit.error(function() {
        return acceptable(5);
      }).error(function() {
        return acceptable([5]);
      }).error(function() {
        return acceptable('js', 9);
      }).error(function() {
        return acceptable(['js', 9]);
      }).error(function() {
        return accpetable(false);
      }).error(function() {
        return acceptable(/.*/);
      }).error(function() {
        return acceptable(_.noop);
      }).error(function() {
        return acceptable({});
      });
    });
    it('should respond with 200 for acceptable content negotiation', function(done) {
      unit.httpAgent(app).get('/test').set('Accept', 'application/json').expect(200).end(done);
    });
    return it('should respond with 406 for unacceptable content negotiation', function(done) {
      unit.httpAgent(app).get('/test').set('Accept', 'application/xml').expect(406).end(done);
    });
  });

}).call(this);
