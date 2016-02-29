'use strict';

require('angular-mocks');

describe('CalendarController', function() {
  beforeEach(angular.mock.module('calendar'));

  var $controller, $scope, controller, $rootScope;

  beforeEach(inject(function(_$rootScope_,_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = {};
    controller  = $controller('CalendarController', { $scope: $scope });

    $scope.time = [12,12.5];

  }));

});
