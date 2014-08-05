define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name uiApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the uiApp
   */
  angular.module('uiApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});
