// Test cases for riddle 1 js version
// Created: June 30, 2016
// Author: Larry Battle
var assert = require('chai').assert;
var riddle1 = require("../index.js");

var fn = riddle1.findAllLightsOn;

describe('Riddle 1: When there', function () {
  describe('are negative lights in the house', function () {
    it('a error should be thrown', function () {
      assert.throws(function(){
        fn(-1);
      }, Error);
    });
  });
  describe('are zero lights in the house', function () {
    it('zero lights should be on', function () {
      assert.equal(fn(0), 0);
    });
  });
  describe('are positive lights off in the house', function () {
    describe('if 1 person enter a house with 1 light', function () {
      it('then there should have 1 light on after the person left', function () {
        assert.equal(fn(1), 1);
      });
    });
    describe('if 2 people enter a house with 2 lights', function () {
      it('then there should have 1 light on after the people leave', function () {
        assert.equal(fn(2), 1);
      });
    });
    describe('if 3 people enter a house with 3 lights', function () {
      it('then there should have 2 lights on after the people leave', function () {
        assert.equal(fn(3), 1);
      });
    });
    describe('if 10 people enter a house with 10 lights', function () {
      it('then there should have 2 lights on after the people leave', function () {
        assert.equal(fn(3), 1);
      });
    });
  });
});
