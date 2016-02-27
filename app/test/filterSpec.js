'use strict';

require('angular-mocks');


describe('Filters', function(){

  beforeEach(angular.mock.module('calendar'));


  describe('monthDayFormat', function(){
    var monthDayFormatFilter, day;

    beforeEach(inject(function(_monthDayFormatFilter_){
      monthDayFormatFilter = _monthDayFormatFilter_;
    }));

    it('tranform Date in format \'26 Mar\' or \'26 Mar, 2017\'', function(){
      day = new Date('2015','02','26');
      expect(monthDayFormatFilter(day)).toEqual('26 Mar');

      day = new Date('2014','01','23');
      expect(monthDayFormatFilter(day,true)).toEqual('23 Fev, 2014');
    });
  });


  describe('hourFormatFilter', function(){

    var hourFormatFilter;

    beforeEach(inject(function(_hourFormatFilter_){
      hourFormatFilter = _hourFormatFilter_;
    }));

    it('transform number in hours with format hh:mm', function(){
      var time = 18.3;
      expect(hourFormatFilter(time)).toEqual('18h18');

      time = 9.5;
      expect(hourFormatFilter(time)).toEqual('9h30');

      time = 18.0000;
      expect(hourFormatFilter(time)).toEqual('18h00');
    });

  });

  describe('dayFormatFilter', function(){

    var dayFormatFilter;

    beforeEach(inject(function(_dayFormatFilter_){
      dayFormatFilter = _dayFormatFilter_;
    }));

    it('transform number in hours with format hh:mm', function(){
      var day = '3/10/2016, 12:00:00 AM';
      expect(dayFormatFilter(day)).toEqual('Qui 10/03');

      day = '3/11/2016, 12:00:00 AM';
      expect(dayFormatFilter(day)).toEqual('Sex 11/03');

      day = '2/25/2016, 12:00:00 AM';
      expect(dayFormatFilter(day)).toEqual('Qui 25/02');
    });

  });


});
