'use strict';

var url = require('url')
  , request = require('request')
  , debug = require('diagnostics')('geoip2');

/**
 * GeoIp2APIClient constructor.
 *
 * @param {Object} options Configuration.
 * @Constructor
 * @api public
 */
var GeoIp2Client = module.exports = function GeoIp2Client(options) {
  if (!(this instanceof GeoIp2Client)) return new GeoIp2Client(options);

  this.options = options || {};
  this.options.port = this.options.port || 8082;
  this.options.timeout = this.options.timeout || 5E3;
  this.options.hostname = this.options.hostname || 'localhost';
  this.options.protocol = this.options.protocol || 'http';
  this.options.host = this.options.host || (
    this.options.hostname + ':' + this.options.port
  );

  debug('created new GeoIP2 client');
};

/**
 * Query the API by IP.
 *
 * @param {String} ip IP to query for.
 * @param {Function} done Completion callback.
 * @api public
 */
GeoIp2Client.prototype.get = function get(ip, done) {
  var uri = url.format({
    protocol: this.options.protocol,
    hostname: this.options.hostname,
    host: this.options.host,
    port: this.options.port,
    pathname: ip
  });

  debug('querying data from GeoIP2 via %s', uri);

  //
  // Do a GET request to the generated url.
  //
  request.get({
    timeout: this.options.timeout,
    json: true,
    uri: uri
  }, function resolved(error, response, result) {
    if (error || response.statusCode !== 200 || result.code === 'InternalError')  {
      error = error || new Error(result.message || 'Failed to query IP');
      debug('failed to GET data for IP: %s', error.message);

      return done(error);
    }

    done(null, result);
  });
};