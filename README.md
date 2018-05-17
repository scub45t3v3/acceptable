# Acceptable
[![Build Status](https://travis-ci.org/scub45t3v3/acceptable.svg?branch=master)](https://travis-ci.org/scub45t3v3/acceptable)

## Purpose
Error fast/early for *406 Not Acceptable* requests

## Installation
Via [npm](https://www.npmjs.com/)

```
npm install acceptable
```

## Usage
*Coffeescript*

```coffeescript
express = require 'express'
acceptable = require 'acceptable'

app = express()
app.use acceptable('json', 'txt', 'html', 'xml', 'js', 'jpg')
```

*Javascript*

```javascript
var express = require('express');
var acceptable = require('acceptable');

var app = express();

app.use(acceptable('json', 'txt', 'html', 'xml', 'js', 'jpg'));
```

## Test
```
npm install
npm test
```