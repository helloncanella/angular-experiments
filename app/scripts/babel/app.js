'use strict';
(function(angular){

  var app = angular.module('app', []);

  app.filter('hourFormat', function(){
    return function(input){

      var text, hour, minute;

      if(input<=24 && input>0){
        hour = Math.floor(input);
        minute = (60*(input-hour)+'0').slice(0,2);

        text = hour+':'+minute;

      }else{
        text = 'the input needs to be between 0 and 24';
      }

      return text;

    };
  });


  app.factory('calendarHelper',function(){
    return {
      time: function(availability){

        var timeArray = [],
            time = availability.start;

        while(time<=availability.end){
          timeArray.push(time);
          time+=0.5;
        }


        return timeArray;
      },

      thirtyDays: function(today){
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
      }

    };
  });



  app.controller('CalendarController', ['$scope','calendarHelper', function CalendarController($scope, calendarHelper) {

    $scope.availability = {
      start:12,
      end:20
    };


    $scope.time = calendarHelper.time($scope.availability);
    $scope.thirtyDays = calendarHelper.thirtyDays();

  }]);

  app.directive('gridCalendar',function(){
    return{
      templateUrl:'view/templates/grid-calendar.html' // DON'T USE ./view/bla,bla,bla...
    };
  });



})(window.angular|| require('angular'));
