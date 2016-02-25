'use strict';

require('angular-mocks');


describe('Filters', function(){

  beforeEach(angular.mock.module('app'));

  describe('hourFormatFilter', function(){

    var hourFormatFilter;

    beforeEach(inject(function(_hourFormatFilter_){
      hourFormatFilter = _hourFormatFilter_;
    }));

    it('transform number in hours with format hh:mm', function(){
      var time = 18.3;
      expect(hourFormatFilter(time)).toEqual('18:18');

      time = 9.5;
      expect(hourFormatFilter(time)).toEqual('9:30');

      time = 18.0000;
      expect(hourFormatFilter(time)).toEqual('18:00');
    });

  });

  describe('dayFormatFilter', function(){

    var dayFormatFilter;

    beforeEach(inject(function(_dayFormatFilter_){
      dayFormatFilter = _dayFormatFilter_;
    }));

    it('transform number in hours with format hh:mm', function(){
      var day = '3/10/2016, 12:00:00 AM';
      expect(dayFormatFilter(day)).toEqual('Qui, 10/03');

      day = '3/11/2016, 12:00:00 AM';
      expect(dayFormatFilter(day)).toEqual('Sex, 11/03');

      day = '2/25/2016, 12:00:00 AM';
      expect(dayFormatFilter(day)).toEqual('Qui, 25/02');
    });

  });


});
