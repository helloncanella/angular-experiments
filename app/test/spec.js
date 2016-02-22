'use strict';

require('angular-mocks');

describe('filter', function () {
  beforeEach(angular.mock.module('myApp'));

  describe('reverse', function () {
    it('should reverse a string', inject(function (reverseFilter) {
      expect(reverseFilter('ABCD')).toEqual('DCBA');
    }));
  });
});
