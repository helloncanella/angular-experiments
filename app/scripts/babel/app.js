'use strict';
(function(angular){

  var calendar = angular.module('calendar', []);

  calendar
    .factory('calendarHelper',function(){
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

          for(var i=0; 28>i; i++){
            day = new Date(year, month, todayDate + i);
            thirtyDays.push(day.toLocaleString());
          }

          return thirtyDays;
        }

      };
    })

    .filter('monthDayFormat', function() {

      return function(date, withYear) {

        var output;

        var
          monthArray = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          day = date.getDate()+' ',
          month = monthArray[date.getMonth()],
          year = withYear ? ', '+date.getFullYear() : '';

        return day+month+year;
      };
    })

    .filter('dayFormat', function(){
      return function(input){

        var
          weekDayArray = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'],
          day = new Date(input),
          weekDay = weekDayArray[day.getDay()],
          month = ('0'+(day.getMonth() + 1)).slice(-2),
          monthDay = ('0'+day.getDate()).slice(-2);


        return weekDay+' '+monthDay+'/'+month;
      };
    })

    .filter('hourFormat', function(){
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
    })

    .controller('CalendarController', ['$scope','calendarHelper', function CalendarController($scope, calendarHelper) {

      $scope.availability = {
        start:12,
        end:20
      };

      $scope.time = calendarHelper.time($scope.availability);
      $scope.thirtyDays = calendarHelper.thirtyDays();

    }])

    .controller('ControlController', ['$scope', function ControlController($scope){
      $scope.pastWeek = 0;

      $scope.oneWeekBack = function(){
        if($scope.pastWeek>0){
          $scope.pastWeek--;
        }
      };

      $scope.oneWeekForward = function(){
        if(3>$scope.pastWeek){
          $scope.pastWeek++;
        }
      };

    }])

    .directive('control',['$rootScope','$document', '$window',function($rootScope, $document, $window){

      function link(scope,element,attr){

        var  width, widthStr, scrollXBox;

        var token = attr.token;

        //setting the icon
        if(token == 'back'){
          scope.iconClass = 'fa fa-arrow-left';
        }else if(token == 'forward'){
          scope.iconClass = 'fa fa-arrow-right';
        }

        element.bind('click', function(){
          var scrollXBox = geScrollXBox();
          var width = getBoxWidth();

          if(token=='back'){
            scrollXBox.scrollLeft -= width;
          }else if(token=='forward'){
            scrollXBox.scrollLeft += width;
          }

          scope.action();
          $rootScope.$digest();

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
        restrict: 'E',
        scope:{
          token:'@',
          action:'&'
        },
        link: link,
        templateUrl:'view/templates/control/control.html'
      };
    }])

    .directive('gridCalendar',function(){
      return{
        restrict: 'E',
        templateUrl:'view/templates/calendar/components/grid-calendar.html', // DON'T USE ./view/bla,bla,bla...
      };
    })

    .directive('dayHeader',function(){
      return{
        restrict: 'E',
        templateUrl:'view/templates/calendar/components/day-header.html' // DON'T USE ./view/bla,bla,bla...
      };

    })

    .directive('timeBar',function(){
      return{

        restrict: 'E',
        templateUrl:'view/templates/calendar/components/time-bar.html' // DON'T USE ./view/bla,bla,bla...
      };
    })

    .directive('calendar',['$window', function($window){
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
    }])

    .directive('dayLimits', function(){

      return{
        restrict:'E',
        templateUrl: 'view/templates/day-limits/day-limits.html',
        link: function(scope,element){
          var today = new Date();
          var monthDay = today.getDate();
          var month = today.getMonth();
          var year = today.getFullYear();

          changeLimits();

          scope.$watch('pastWeek', function(){
            changeLimits();
          });

          function changeLimits(){

            var deltaTime = scope.pastWeek*7;

            scope.start = new Date(year, month, monthDay + deltaTime);
            scope.end = new Date(year, month, (monthDay+6) + deltaTime);
          }
        },
      };
    })

    .directive('resizecell', function(){
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
    })

    .directive('resizecontent', function(){
      return{
        restrict: 'A',
        link: function(scope,element,attr){
          scope.$watch(
          'cellWidth', function ( cellWidth ) {
            element[0].style.width = (28*cellWidth)+'px';
          });
        }
      };
    });

})(window.angular|| require('angular'));
