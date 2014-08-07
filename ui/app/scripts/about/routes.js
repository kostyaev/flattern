/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
  'use strict';
    
  var mod = angular.module('about.routes', []);
  mod.config(['$stateProvider',
      function($stateProvider)  {
    $stateProvider
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller:controllers.AboutCtrl
        })
  }]);
  return mod;
});
