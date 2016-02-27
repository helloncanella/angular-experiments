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

  // describe('<class-note>', function(){
  //
  //   it('', function() {
  //
  //     // Compile a piece of HTML containing the directive
  //     var element = $compile("<class-note></class-note>")($rootScope);
  //     // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
  //     $rootScope.$digest();
  //
  //     var classNote = element[0];
  //
  //     expect('')
  //
  //   });
  // });







});
