# node-geoip2-client

[![Version npm][version]](http://browsenpm.org/package/node-geoip2-client)[![Build Status][build]](https://travis-ci.org/observing/node-geoip2-client)[![Dependencies][david]](https://david-dm.org/observing/node-geoip2-client)[![Coverage Status][cover]](https://coveralls.io/r/observing/node-geoip2-client?branch=master)

[version]: http://img.shields.io/npm/v/node-geoip2-client.svg?style=flat-square
[build]: http://img.shields.io/travis/observing/node-geoip2-client/master.svg?style=flat-square
[david]: https://img.shields.io/david/observing/node-geoip2-client.svg?style=flat-square
[cover]: http://img.shields.io/coveralls/observing/node-geoip2-client/master.svg?style=flat-square

Node.js client for its Restify server counterpart: node-geoip2-api. This
module is best used in conjunction with its counterpart. It prevents
the developer from constructing API requests manually.

## Installation

```sh
npm install node-geoip2-client --save
```

### Instantiation

Create a new GeoIP2 API instance by calling the constructor.

```js
var Client = require('node-geoip2-client')
  , client = new Client({
      host: '129.123.237.21',         // defaults to localhost
      protocol: 'https',              // defaults to http
      port: '443',                    // defaults to 8082
      timeout: 1E3                    // defaults to 5000 ms
    });
```

### API

The client has several methods available to query the MaxMind GeoIP3 database.

#### client.get

Query the database by IP. The client will perform a request to the
configured server and return the results.

- **ip**: _{String}_ required query database by IP.
- **callback**: _{Function}_ required Completion callback.

```js
client.get('172.213.123.21', function (error, result) {
  console.log(result);                // results parsed as JSON
});
```

### License

Node-geoip2-client is released under MIT.