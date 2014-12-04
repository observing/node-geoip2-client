'use strict';

var chai = require('chai')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.config.includeStack = true;

//
// Expose GeoIP2 Client.
//
exports.Client = require('../');

//
// Expose our assertations.
//
exports.expect = chai.expect;
exports.sinon = sinon;
