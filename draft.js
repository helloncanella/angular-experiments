'use strict';
(function(angular){

  var app = angular.module('app', []);

  app.filter('monthDayFormat', function() {

    return function(date, withYear) {

      var output;

      var
        monthArray = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        day = date.getDate()+' ',
        month = monthArray[date.getMonth()],
        year = withYear ? ', '+date.getFullYear() : '';

      return day+month+year;
    };

  });

  app.filter('dayFormat', function(){
    return function(input){

      var
        weekDayArray = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'],
        day = new Date(input),
        weekDay = weekDayArray[day.getDay()],
        month = ('0'+(day.getMonth() + 1)).slice(-2),
        monthDay = ('0'+day.getDate()).slice(-2);


      return weekDay+' '+monthDay+'/'+month;
    };
  });

  app.filter('hourFormat', function(){
    return function(input){

      var text, hour, minute;

      if(input<=24 && input>0){
        hour = Math.floor(input);
        minute = (60*(input-hour)+'0').slice(0,2);

        text = hour+'h'+minute;

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
          thirtyDays.push(day.toLocaleString());
        }

        return thirtyDays;
      }

    };
  });



  app.controller('MyAvailabilityController', ['$scope','calendarHelper', function MyAvailabilityController($scope, calendarHelper) {

    $scope.availability = {
      start:12,
      end:20
    };

    $scope.time = calendarHelper.time($scope.availability);
    $scope.thirtyDays = calendarHelper.thirtyDays();

  }]);

  app.directive('control',['$document', '$window',function($document, $window){

    function link(scope,element,attr, dayLimitsCtrl){
      console.log(attr);

      var  width, widthStr, scrollXBox;

      var action = attr.action;


      //setting the icon
      if(action == 'back'){
        scope.iconClass = 'fa fa-arrow-left';
      }else if(action == 'forward'){
        scope.iconClass = 'fa fa-arrow-right';
      }

      element.bind('click', function(){
        var scrollXBox = geScrollXBox();
        var width = getBoxWidth();

        if(action=='back'){
          scrollXBox.scrollLeft -= width;

          if(0<=dayLimitsCtrl.pastWeeks){
            // dayLimitsCtrl.pastWeeks--;
          }
        }else if(action=='forward'){
          // dayLimitsCtrl.pastWeeks++;
          scrollXBox.scrollLeft += width;
        }

        function geScrollXBox(){
          return angular.element($document[0].getElementById('scroll-x-box'))[0];
        }

        function getBoxWidth(){
          widthStr=$window.getComputedStyle(scrollXBox).width;
          return Number(widthStr.replace(/px/,''));
        }
      });
    }
    return{
      require: '^dayLimits',
      restrict: 'E',
      scope:{
        action:'@',
      },
      link: link,
      templateUrl:'view/templates/control/control.html'
    };
  }]);

  app.directive('gridCalendar',function(){
    return{
      restrict: 'E',
      templateUrl:'view/templates/calendar/components/grid-calendar.html', // DON'T USE ./view/bla,bla,bla...
      link: function(scope, element, attr){

      }
    };
  });


  app.directive('dayHeader',function(){
    return{
      restrict: 'E',
      templateUrl:'view/templates/calendar/components/day-header.html' // DON'T USE ./view/bla,bla,bla...
    };
  });

  app.directive('timeBar',function(){
    return{
      restrict: 'E',
      templateUrl:'view/templates/calendar/components/time-bar.html' // DON'T USE ./view/bla,bla,bla...
    };
  });

  app.directive('calendar',['$window', function($window){
    return{
      restrict: 'E',
      templateUrl:'view/templates/calendar/calendar.html', // DON'T USE ./view/bla,bla,bla...
      link: function(scope,element,attr, ctrl){
        scope.cellWidth = element[0].querySelector('#calendar').clientWidth / 8;

        angular.element($window).bind('resize', function(){
          scope.cellWidth = element[0].querySelector('#calendar').clientWidth / 8;
          scope.$digest();
        });
      }
    };
  }]);

  app.directive('dayLimits', function(){

    return{
      restrict:'E',
      templateUrl: 'view/templates/day-limits/day-limits.html',
      scope:{},
      controllerAs:'ctrl',
      controller: function(){
        var today = new Date();
        var monthDay = today.getDate();
        var month = today.getMonth();
        var year = today.getFullYear();

        this.pastWeeks = 0;
        this.start = new Date(year, month, monthDay + this.pastWeeks*7);
        this.end = new Date(year, month, (monthDay+6) + this.pastWeeks*7);
      },
    };
  });

  app.directive('resizecell', function(){
    return{
      restrict: 'A',
      link: function(scope,element,attr){
        scope.$watch(
          'cellWidth', function ( cellWidth ) {
            element[0].style.width = cellWidth+'px';
          }
        );
      }
    };
  });


  app.directive('resizecontent', function(){
    return{
      restrict: 'A',
      link: function(scope,element,attr){
        scope.$watch(
        'cellWidth', function ( cellWidth ) {
          element[0].style.width = (30*cellWidth)+'px';
        });
      }
    };
  });

})(window.angular|| require('angular'));
