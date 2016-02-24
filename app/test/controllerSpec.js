'use strict';

require('angular-mocks');

describe('CalendarController', function() {
  beforeEach(angular.mock.module('app'));

  var $controller, $scope, controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $scope = {};
    controller  = $controller('CalendarController', { $scope: $scope });
  }));

  describe('$scope.time', function() {
    var availability, timeArray = [];

    beforeEach(function(){
      $scope.availability = {
        start: 12, //12h
        end: 20 //20h
      };

      timeArray = $scope.time;
    });

    it('given the availability output an array of time', function() {
      expect(timeArray.length).toEqual(17);
    });

    it('the first component needs to be 12.5 and the last 20', function(){
      var last = timeArray.length - 1;
      expect(timeArray[1]).toEqual(12.5);
      expect(timeArray[last]).toEqual(20);
    });

  });

  describe('$scope.days', function () {

    var today, thirtyDays;

    beforeEach(function(){
      thirtyDays = $scope.thirtyDays;
    });

    it('outputs an array with 30 days', function(){
      expect(thirtyDays.length).toEqual(30);
    });

  });

});
