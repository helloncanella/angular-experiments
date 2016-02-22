'use strict';

var angular = require('angular');

var myApp = angular.module('myApp', []);

myApp.factory('Data', function () {
  return { message: 'I\'m data from a service' };
});

myApp.filter('reverse', function () {
  return function (text) {

    console.log('LALAL',text.split('').reverse().join(''));

    return text.split('').reverse().join('');
  };
});
