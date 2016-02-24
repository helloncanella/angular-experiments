'use strict';
(function(angular){

  var app = angular.module('app', []);

  app.controller('CalendarController', function CalendarController($scope) {

    $scope.availability = {
      start:12,
      end:20
    };

    $scope.time = function(){
      var timeArray = [],
          time = this.availability.start;

      while(time<=this.availability.end){
        timeArray.push(time);
        time+=0.5;
      }

      return timeArray;
    };

    $scope.thirtyDays = function(today){

        today = today || new Date(); // today may be defined in the argument

        var
          day,
          year = today.getFullYear(),
          month = today.getMonth(),
          todayDate = today.getDate(),
          thirtyDays = [];

      for(var i=0; 30>i; i++){
        day = new Date(year, month, todayDate + i);
        thirtyDays.push(day);
      }

      return thirtyDays;
    };

  });

  app.directive('gridCalendar',function(){
    return{
      templateUrl:'view/templates/grid-calendar.html' // DON'T USE ./view/bla,bla,bla...
    };
  });



})(window.angular|| require('angular'));
