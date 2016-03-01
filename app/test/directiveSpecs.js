'use strict';

/*global angular*/


require('angular-mocks');

describe('Directives', function() {

  var
    $compile, $rootScope, $scope;

  // Load the myApp module, which contains the directive
  beforeEach(angular.mock.module('calendar'));
  beforeEach(angular.mock.module('templates'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  describe('grid', function() {
    var element;

    beforeEach(function() {
      element = $compile("<div grid numberOfTimeBlocks='5'></div>")($scope);
      $scope.$digest();
    });


    it('select one day and hour in the grid conform the numberOfTimeBlocks', function() {

      console.log(element.scope().active);

      // var startHour = '15';
      //
      //
      //
      // console.log(element.scope());
      //
      //
      // $scope.select('20', startHour);
      //
      // expect($scope.active['20']['15']).toBeTruthy();
      // expect($scope.active['20']['16']).toBeTruthy();
      // expect($scope.active['20']['17']).toBeTruthy();
      // expect($scope.active['20']['18']).toBeTruthy();
      // expect($scope.active['20']['19']).toBeTruthy();

    });

    it('deselect all when new is selected', function() {

      $scope.numberOfTimeBlocks = 2;

      $scope.select('1', '15');
      $scope.select('3', '20');

      $scope.select('9', '1000');

      expect($scope.active['1']['15']).not.toBeTruthy();
      expect($scope.active['3']['20']).not.toBeTruthy();
      expect($scope.active['9']['1000']).toBeTruthy();
      expect($scope.active['9']['1001']).toBeTruthy();

    });
  });

  describe('classScheduling', function() {
    var element, cell, windowWidth, windowHeight, $window = {};

    var cellFactory = function(newObject) {

      var cell = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: 0,
        width: 0
      };

      for (var key in newObject) {
        if (cell.hasOwnProperty(key)) {
          cell[key] = newObject[key];
        } else {
          throw "key '" + key + "' isn't contained by cell model";
        }
      }

      return cell;

    };


    beforeEach(function() {
      inject(['$window', function(_$window_) {
        $window = _$window_;
        windowWidth = $window.innerWidth = 1024;
        windowHeight = $window.innerHeight = 768;
      }]);
    });


    describe('Horizontal Positioning', function() {

      it('if cellMeasure left < windowWidth/2 => pane is at its right ', function() {

        $rootScope.cell = cellFactory({
          left: 350,
          right: 450
        });

        var panel = $compile("<class-scheduling measures='cell' width='100' height='100'></class-scheduling>")($rootScope)[0];

        $rootScope.$digest();

        var
          panelLeft = Number(panel.style.left.replace(/px/, '')),
          cellRight = $rootScope.cell.right;



        expect(cellRight < panelLeft).toBeTruthy();
      });

      it('if cellLeft => windowWidth/2 => panel is at its left ', function() {

        $rootScope.cell = cellFactory({
          left: 512,
          right: 612,
          width: 100
        });

        var width = 100;
        var height = 100;

        var panel = $compile("<class-scheduling measures='cell' width='100' height='100'></class-scheduling>")($rootScope)[0];


        $rootScope.$digest();

        var
          panelRight = Number(panel.style.left.replace(/px/, ''))+width,
          cellLeft = $rootScope.cell.left;

        expect(panelRight > 0 && panelRight < cellLeft).toBeTruthy();
      });

      describe('Vertical Positioning', function() {
        it('if cell bottom <= windowHeight/2  , panel top =cell top', function(){
          $rootScope.cell = cellFactory({
            top: 100,
            bottom: 200
          });

          var panel = $compile("<class-scheduling measures='cell' width='100' height='100'></class-scheduling>")($rootScope)[0];

          $rootScope.$digest();

          var
            panelTop = Number(panel.style.top.replace(/px/, '')),
            cellTop = $rootScope.cell.top;


          expect(panelTop).toEqual(cellTop);
        });

        it('if cell bottom => windowHeight/2  , panel bottom = cell bottom', function(){
          $rootScope.cell = cellFactory({
            top: 300,
            height:400,
            bottom: 700
          });

          var height = 100;

          var panel = $compile("<class-scheduling measures='cell' width='100px' height='100px'></class-scheduling>")($rootScope)[0];

          $rootScope.$digest();



          var
            panelBottom = Number(panel.style.top.replace(/px/, ''))+height,
            cellBottom = $rootScope.cell.bottom;

          expect(panelBottom).toEqual(cellBottom);
        });
      });



    });
  });
});
