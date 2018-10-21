# Acceptable
[![Build Status](https://travis-ci.org/scub45t3v3/acceptable.svg?branch=master)](https://travis-ci.org/scub45t3v3/acceptable)
[![Coverage Status](https://coveralls.io/repos/github/scub45t3v3/acceptable/badge.svg)](https://coveralls.io/github/scub45t3v3/acceptable)

## Purpose
Error fast/early for *406 Not Acceptable* requests

## Installation
Via [npm](https://www.npmjs.com/)

```bash
npm install @scuba-squad/acceptable
```

## Usage

```javascript
const express = require('express');
const acceptable = require('@scuba-squad/acceptable');

const app = express();

app.use(acceptable('json', 'txt', 'html', 'xml', 'js', 'jpg'));
```

## Test
[tests](TEST.md)

```bash
npm install
npm test
```