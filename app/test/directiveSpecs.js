'use strict';

require('angular-mocks');

describe('Directives', function() {

var
    $compile,
    $rootScope,
    controller;

  // Load the myApp module, which contains the directive
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.module('templates'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_,_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));


  describe('<grid-calendar>', function(){
    it('The number of generated cells is equal to 510 (30 days * 17 thirty minutes)', function() {
      // Compile a piece of HTML containing the directive
      var element = $compile("<grid-calendar></grid-calendar>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();

      var table = element[0];

      expect(table.querySelectorAll('.cell').length).toEqual(510);
    });
  });

  describe('<time-bar>', function(){
    it('', function() {
      // Compile a piece of HTML containing the directive
      var element = $compile("<time-bar></<time-bar>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();

      var timeBar = element[0];


      expect(timeBar.querySelectorAll('.cell').length).toEqual(17);
    });
  });


  describe('<calendar>', function(){
    it('', function() {
      // Compile a piece of HTML containing the directive
      var element = $compile("<calendar></<calendar>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();

      var timeBar = element[0];



    });
  });



  describe('<day-header>', function(){
    it('', function() {
      // Compile a piece of HTML containing the directive
      var element = $compile("<day-header></day-header>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();

      var dayHeader = element[0];
      //console.log(new Date(dayHeader.querySelector('td').attributes['data-day'].value).getMonth()+1);

      expect(dayHeader.querySelectorAll('.cell').length).toEqual(30);
    });
  });




});
