(() => {
  // include dependencies
  const unit = require('unit.js');
  const express = require('express');
  const acceptable = require('../index');
  const noop = () => {};
  const app = express();

  app.use(acceptable('json', 'txt'));

  app.get('/test', (req, res, next) => {
    return res.format({
      'json': () => {
        return res.status(200).send(req.headers);
      },
      'default': () => {
        return res.status(200).send(req.headers.accept);
      }
    });
  });

  app.use((err, req, res, next) => {
    return res.status(406).send('Not Acceptable');
  });

  // describe acceptable
  describe('#acceptable', () => {
    it('should accept an argument list of extensions', () => {
      const test = acceptable('json', 'txt', 'html', 'jpeg', 'xml');

      unit
        .function(test);
    }); // end it

    it('should accept an array of extensions', () => {
      const test = acceptable([
        'json',
        'txt',
        'html',
        'jpeg',
        'xml',
      ]);

      unit
        .function(test);
    }); // end it

    it('should accept an argument list of mime types', () => {
      const test = acceptable('application/json', 'application/javascript', 'text/plain');

      unit
        .function(test);
    }); // end it

    it('should accept an array of mime types', () => {
      const test = acceptable(['application/json', 'application/javascript', 'text/plain']);

      unit
        .function(test);
    }); // end it

    it('should accept an argument list of extensions or mime types', () => {
      const test = acceptable('json', 'application/javascript', 'xml', 'text/plain');

      unit
        .function(test);
    }); // end it

    it('should accept an array of extensions or mime types', () => {
      const test = acceptable(['application/json', 'js', 'application/xml', 'txt']);

      unit
        .function(test);
    }); // end it

    it('should accept an argument list that contain arrays', () => {
      const test = acceptable('js', ['application/json', 'xml'], 'text/plain');

      unit
        .function(test);
    }); // end it

    it('should throw an error if any argument is not a string or array of strings', () => {
      unit
        .error(() => {
          acceptable(5);
        })
        .error(() => {
          acceptable([5]);
        })
        .error(() => {
          acceptable('js', 9);
        })
        .error(() => {
          acceptable(['js', 9]);
        })
        .error(() => {
          acceptable(false);
        })
        .error(() => {
          acceptable(/.*/);
        })
        .error(() => {
          acceptable(noop);
        })
        .error(() => {
          acceptable({});
        });
    }); // end it

    it('should respond with 200 for acceptable content negotiation', (done) => {
      unit
        .httpAgent(app)
        .get('/test')
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    }); // end it

    it('should respond with 406 for unacceptable content negotiation', (done) => {
      unit
        .httpAgent(app)
        .get('/test')
        .set('Accept', 'application/xml')
        .expect(406)
        .end(done);
    }); // end it
  }); // end describe acceptable
})(); // end IIFE