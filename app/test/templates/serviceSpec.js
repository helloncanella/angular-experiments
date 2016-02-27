'use strict';

require('angular-mocks');

describe('hourFilter', function(){
  beforeEach(angular.mock.module('calendar'));

  var hourFilter;

  beforeEach(inject(function(_hourFilter_){
    hourFilter = _hourFilter_;
  }));



  it('transform number in hours with format hh:mm', function(){
    var time = 18.3;
    expect(hourFilter(time)).toEqual('18:18');

    time = 18.5;
    expect(hourFilter(time)).toEqual('18:30');
  });



});
