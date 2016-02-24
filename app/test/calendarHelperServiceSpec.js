'use strict';

require('angular-mocks');

describe('calendarHelper', function(){
  beforeEach(angular.mock.module('app'));

  var calendarHelper;

  beforeEach(inject(function(_calendarHelper_){
    calendarHelper = _calendarHelper_;
  }));


  describe('time', function(){
    it('given  the availability of {start: 12, end:20} returns a vector with 17 components', function(){
      var availability = {
        start: 12,
        end:20
      };

      expect(calendarHelper.time(availability).length).toEqual(17);
    });
  });



});
