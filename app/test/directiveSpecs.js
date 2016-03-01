'use strict';

require('angular-mocks');

describe('Directives', function() {

var
  $compile, $rootScope, $scope;

  // Load the myApp module, which contains the directive
  beforeEach(angular.mock.module('calendar'));
  beforeEach(angular.mock.module('templates'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = {};

  }));

  describe('grid', function(){
    var element;

    beforeEach(function(){
      element = $compile("<div grid></div>")($scope);
       // each block = 30 minutes - 1,5h of class = 4 timeBlocks;
    });


    it('select one day and hour in the grid conform the numberOfTimeBlocks', function() {

      var startHour = '15';

      $scope.numberOfTimeBlocks = 5;

      $scope.select('20', startHour);

      expect($scope.active['20']['15']).toBeTruthy();
      expect($scope.active['20']['16']).toBeTruthy();
      expect($scope.active['20']['17']).toBeTruthy();
      expect($scope.active['20']['18']).toBeTruthy();
      expect($scope.active['20']['19']).toBeTruthy();

    });

    it('deselect all when new is selected', function(){

      $scope.numberOfTimeBlocks = 2;

      $scope.select('1','15');
      $scope.select('3','20');

      $scope.select('9','1000');

      expect($scope.active['1']['15']).not.toBeTruthy();
      expect($scope.active['3']['20']).not.toBeTruthy();
      expect($scope.active['9']['1000']).toBeTruthy();
      expect($scope.active['9']['1001']).toBeTruthy();

    });
  });

  describe('classScheduling',function(){
    var element, cell, windowWidth, windowHeight ,$window = {};

    var cellFactory = function(newObject){

      var cell = {
        top:0,
        right:0,
        bottom:0,
        left:0,
        height:0,
        width: 0
      };

      for(var key in newObject){
        if(cell.hasOwnProperty(key)){
          cell[key] = newObject[key];
        }else{
          throw "key '"+key+"' isn't contained by cell model";
        }
      }

      return cell;

    };


    beforeEach(function(){
      inject(['$window', function(_$window_){
        $window = _$window_;
        windowWidth = $window.innerWidth = 1024;
        windowHeight = $window.innerHeight = 768;
      }]);
    });

    it('if cellMeasure left < windowWidth/2 => pane is at its right ', function(){

      $rootScope.cell = cellFactory({
        left:350,
        right:450
      });

      var panel = $compile("<class-scheduling measures='cell'></class-scheduling>")($rootScope)[0];

      $rootScope.$digest();

      var
        panelLeft = Number(panel.style.left.replace(/px/,'')),
        cellRight = $rootScope.cell.right;



      expect(cellRight<panelLeft).toBeTruthy();
    });


    it('if cellMeasure left => windowWidth/2 => panel is at its left ', function(){

      $rootScope.cell = cellFactory({
        left:500,
        right:600
      });

      var panel = $compile("<class-scheduling measures='cell'></class-scheduling>")($rootScope)[0];

      $rootScope.$digest();

      var
        panelRight = Number(panel.style.right.replace(/px/,'')),
        cellLeft = $rootScope.cell.left;


      expect(panelRight >0 && panelRight<cellLeft).toBeTruthy();
    });

  });







});
