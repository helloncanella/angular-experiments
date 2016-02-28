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

  describe('day', function(){

    var scope, element;

    beforeEach(function(){
      scope = {};
      element = $compile("<div day></div>")(scope);
    });


    it('select one and the three next', function() {

      scope.select('15');

      expect(scope.active['15']).toBeTruthy();
      expect(scope.active['16']).toBeTruthy();
      expect(scope.active['17']).toBeTruthy();

    });

    it('deselect all when new is selected', function(){
      scope.select('15');
      scope.select('20');

      scope.select('1000');

      expect(scope.active['15']).not.toBeTruthy();
      expect(scope.active['20']).not.toBeTruthy();
      expect(scope.active['1000']).toBeTruthy();
      expect(scope.active['1001']).toBeTruthy();
      expect(scope.active['1002']).toBeTruthy();


    });
  });







});
