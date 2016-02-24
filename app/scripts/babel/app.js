'use strict';
(function(angular){

  var app = angular.module('app', []);

  app.controller('CalendarController', function CalendarController($scope) {

    $scope.time = function(availability){
      var timeArray = [],
          time = availability.start,
          stringTime,
          complement;

      while(time<=availability.end){
        if(time-Math.floor(time) === 0.5){
          complement = ':30';
        }else{
          complement = ':00';
        }

        stringTime = Math.floor(time)+complement;

        timeArray.push(stringTime);
        time+=0.5;
      }

      return timeArray;
    };

    $scope.thirtyDays = function(today){

        today = today || new Date(); // today may be arbitrarily given as argument

        var
          day,
          year = today.getFullYear(),
          month = today.getMonth(),
          todayDate = today.getDate(),
          thirtyDays = [];

      for(var i=0; i<30; i++){
        day = new Date(year, month, todayDate + i);
        thirtyDays.push(day);
      }

      return thirtyDays;
    };



  });

})(window.angular|| require('angular'));
