# TOC
   - [#acceptable](#acceptable)
<a name=""></a>
 
<a name="acceptable"></a>
# #acceptable
should accept an argument list of extensions.

```js
const test = acceptable('json', 'txt', 'html', 'jpeg', 'xml');
unit
  .function(test);
```

should accept an array of extensions.

```js
const test = acceptable([
  'json',
  'txt',
  'html',
  'jpeg',
  'xml',
]);
unit
  .function(test);
```

should accept an argument list of mime types.

```js
const test = acceptable('application/json', 'application/javascript', 'text/plain');
unit
  .function(test);
```

should accept an array of mime types.

```js
const test = acceptable(['application/json', 'application/javascript', 'text/plain']);
unit
  .function(test);
```

should accept an argument list of extensions or mime types.

```js
const test = acceptable('json', 'application/javascript', 'xml', 'text/plain');
unit
  .function(test);
```

should accept an array of extensions or mime types.

```js
const test = acceptable(['application/json', 'js', 'application/xml', 'txt']);
unit
  .function(test);
```

should accept an argument list that contain arrays.

```js
const test = acceptable('js', ['application/json', 'xml'], 'text/plain');
unit
  .function(test);
```

should throw an error if any argument is not a string or array of strings.

```js
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
```

should respond with 200 for acceptable content negotiation.

```js
unit
  .httpAgent(app)
  .get('/test')
  .set('Accept', 'application/json')
  .expect(200)
  .end(done);
```

should respond with 406 for unacceptable content negotiation.

```js
unit
  .httpAgent(app)
  .get('/test')
  .set('Accept', 'application/xml')
  .expect(406)
  .end(done);
```

