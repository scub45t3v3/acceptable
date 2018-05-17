# TOC
   - [#acceptable](#acceptable)
<a name=""></a>
 
<a name="acceptable"></a>
# #acceptable
should accept an argument list of extensions.

```js
var test;
test = acceptable('json', 'txt', 'html', 'jpeg', 'xml');
unit.function(test);
return null;
```

should accept an array of extensions.

```js
var test;
test = acceptable(['json', 'txt', 'html', 'jpeg', 'xml']);
unit.function(test);
return null;
```

should accept an argument list of mime types.

```js
var test;
test = acceptable('application/json', 'application/javascript', 'text/plain');
unit.function(test);
return null;
```

should accept an array of mime types.

```js
var test;
test = acceptable(['application/json', 'application/javascript', 'text/plain']);
unit.function(test);
return null;
```

should accept an argument list of extensions or mime types.

```js
var test;
test = acceptable('json', 'application/js', 'xml', 'text/plain');
unit.function(test);
return null;
```

should accept an array of extensions or mime types.

```js
var test;
test = acceptable(['json', 'application/js', 'xml', 'text/plain']);
unit.function(test);
return null;
```

should accept an argument list that contain arrays.

```js
var test;
test = acceptable('js', ['application/json', 'xml'], 'text/plain');
unit.function(test);
return null;
```

should throw an error if any argument is not a string or array of strings.

```js
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
return null;
```

should respond with 200 for acceptable content negotiation.

```js
unit.httpAgent(app).get('/test').set('Accept', 'application/json').expect(200).end(done);
return null;
```

should respond with 406 for unacceptable content negotiation.

```js
unit.httpAgent(app).get('/test').set('Accept', 'application/xml').expect(406).end(done);
return null;
```

