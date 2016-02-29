'use strict';

require('angular-mocks');

describe('Directives', function() {

var
  $compile,
  $rootScope,
  controller;

  // Load the myApp module, which contains the directive
  beforeEach(angular.mock.module('calendar'));
  beforeEach(angular.mock.module('templates'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_,_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;

  }));

  describe('grid', function(){

    var $scope, element;

    beforeEach(function(){
      $scope = {};

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







});
