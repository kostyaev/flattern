define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name uiApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the uiApp
   */
  angular.module('uiApp.controllers.AboutCtrl', [])
    .controller('AboutCtrl', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});
