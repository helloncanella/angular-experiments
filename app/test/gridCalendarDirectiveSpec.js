'use strict';

require('angular-mocks');

describe('Unit testing great quotes', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.module('templates'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('The number of generated cells is equal to 510 (30 days * 17 thirty minutes)', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<grid-calendar></grid-calendar>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

    var table = element[0];

    expect(table.querySelectorAll('td').length).toEqual(510);
  });
});
