'use strict';

var angular = window.angular|| require('angular');
var lodash = window._ || require('lodash');

(function(angular, _){

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

    .controller('CalendarController', ['$scope','calendarHelper', function ($scope, calendarHelper) {

      var blockDuration = 0.5; // 0.5h = 30 minutes

      $scope.availability = {
        start:12, //12h
        end:20 //20h
      };

      $scope.classDuration = 1.5; //1h30 min

      $scope.numberOfTimeBlocks = Math.floor($scope.classDuration / blockDuration) + 1;

      $scope.time = calendarHelper.time($scope.availability);

      $scope.thirtyDays = calendarHelper.thirtyDays();
    }])



    .controller('ClassSchedulingController', ["$scope","dayFormatFilter", "hourFormatFilter", function($scope, dayFormatFilter, hourFormatFilter){
      $scope.closed = true;

      $scope.cellMeasures = {};

      $scope.close = function(){
        $scope.closed = true;
      };

      $scope.setClassTime = function(day, hour){
        $scope.open();

        $scope.selectedDay =  dayFormatFilter(day);

        var
          start = hourFormatFilter(hour),
          end = hourFormatFilter(hour + $scope.classDuration);

        $scope.selectedHour = start + ' - ' + end;
      };

      $scope.open = function(){
        $scope.closed = false;
      };
    }])

    .controller('ControlController', ['$scope', function ControlController($scope){
      $scope.pastWeek = 0;

      $scope.oneWeekBack = function(){
        if(0<$scope.pastWeek){
          $scope.pastWeek--;
        }
      };

      $scope.oneWeekForward = function(){
        if($scope.pastWeek<3){
          $scope.pastWeek++;
        }
      };

    }])

    .directive('cell',['$window', '$rootScope' ,function($window, $rootScope){
      var link =  function(scope, element){
        element.bind('click', function(){

          var cellMeasures = element[0].getBoundingClientRect();

          for(var key in cellMeasures){
            scope.measures[key] = cellMeasures[key];
          }

          $rootScope.$digest();
        });
      };

      return{
        link:link,
        scope:{
          measures:"="
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
    })

    .directive('classScheduling', ['$window', function($window){

      var link = function (scope, element){

        scope.$watch('measures', function(){

          var
            cellMeasures = scope.measures,
            windowWidth = $window.innerWidth,
            windowHeight = $window.innerHeight,
            padding = 5; //5px
            element.css('position', 'absolute');

          var width = Number(scope.width.replace(/px/,''));
          var height = Number(scope.height.replace(/px/,''));

          //Horizontal Positioning
          if(cellMeasures.left < windowWidth/2){
            element.css("left",(cellMeasures.right + padding)+'px');
          }else{
            element.css("left",(cellMeasures.right - padding - cellMeasures.width - width)+'px');
          }

          //Vertical Positioning
          if(cellMeasures.bottom < windowHeight/2){
            element.css("top",cellMeasures.top+'px');
          }else{
            element.css("top",(cellMeasures.bottom-height)+'px');
          }
        },true);
      };

      return{
        restrict:'E',
        templateUrl:'view/templates/class-scheduling/class-scheduling.html',
        link: link,
        scope: {
          measures:"=",
          width:"@",
          height:"@"
        }
      };

    }])

    .directive('grid', ['$document',function($document) {
      var link = function(scope){

        scope.active = {};
        scope.select = function(dayIndex, hourIndex){

          _.each(scope.active, setFalse);
          scope.active[dayIndex] = {};

          var nBlocks = scope.numberOfTimeBlocks;

          for(var i = 0; i<nBlocks; i++){
            scope.active[dayIndex][Number(hourIndex) + i] = true;
          }

        };

        function setFalse (day) {

          _.each(day, function(hour, index, day){
            day[index] = false; // day[index] == hour;
          });

        }

      };

      return{
        link:link,
      };

    }])




    ;

})(angular, lodash);
