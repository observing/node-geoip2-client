/*global beforeEach, afterEach*/
'use strict';

var common = require('./common')
  , request = require('request')
  , expect = common.expect
  , sinon = common.sinon
  , Client = common.Client
  , client;

describe('Client', function() {
  beforeEach(function () {
    client = new Client;
  });

  afterEach(function() {
    client = null;
  });

  it('is a constructor', function() {
    expect(Client).to.be.a('function');
    expect(client).to.be.instanceof(Client);
    expect(client).to.be.an('object');
  });

  it('provides a set of default options', function () {
    expect(client.options).to.be.an('object');
    expect(client.options).to.have.property('host', 'localhost:8082');
    expect(client.options).to.have.property('port', 8082);
    expect(client.options).to.have.property('hostname', 'localhost');
    expect(client.options).to.have.property('protocol', 'http');
    expect(client.options).to.have.property('timeout', 5E3);
  });

  it('has configurable options', function () {
    var local = new Client({
      port: 8081,
      protocol: 'https'
    });

    expect(local.options).to.have.property('port', 8081);
    expect(local.options).to.have.property('protocol', 'https');
  });

  it('will construct the host from hostname and port', function () {
    var local = new Client({
      port: 8083,
      hostname: 'test'
    });

    expect(local.options).to.have.property('host', 'test:8083');
  });

  describe('#get', function () {
    it('is a function', function() {
      expect(client.get).to.be.a('function');
    });

    it('will query the configured GeoIP2 database by IP and return JSON', function (done) {
      expect(client.get.length).to.equal(2);

      var spy = sinon.spy(request, 'get');
      client.get('127.0.0.1', function () {
        expect(spy.callCount).to.equal(1);
        expect(spy.args[0][0]).to.have.property('uri', 'http://localhost:8082/127.0.0.1');
        expect(spy.args[0][0]).to.have.property('json', true);

        spy.restore();
        done();
      });
    });

    it('will return an error on failed query', function (done) {
      var short = new Client({ timeout: 500 });

      short.get('127.0.0.1', function (error, result) {
        expect(error).to.be.instanceof(Error);
        expect(result).to.equal(undefined);
        expect(error.message).to.include('ECONNREFUSED');

        done();
      });
    });
  });
});