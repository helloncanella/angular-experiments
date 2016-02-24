'use strict';

require('angular-mocks');

describe('hourFormatFilter', function(){
  beforeEach(angular.mock.module('app'));

  var hourFormatFilter;

  beforeEach(inject(function(_hourFormatFilter_){
    hourFormatFilter = _hourFormatFilter_;
  }));



  it('transform number in hours with format hh:mm', function(){
    var time = 18.3;
    expect(hourFormatFilter(time)).toEqual('18:18');

    time = 18.5;
    expect(hourFormatFilter(time)).toEqual('18:30');

    time = 18.0000;
    expect(hourFormatFilter(time)).toEqual('18:00');
  });

});
