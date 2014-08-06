/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
  'use strict';
    
  var mod = angular.module('about.routes', []);
  mod.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/about', {templateUrl:'views/about.html', controller:controllers.AboutCtrl});
  }]);
  return mod;
});
