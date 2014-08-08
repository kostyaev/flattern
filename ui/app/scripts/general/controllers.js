/**
 * User controllers.
 */
define(['angular'], function(angular) {
    'use strict';

  var MainCtrl = function ($scope) {
      $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
      ];
  };
  MainCtrl.$inject = ['$scope'];

  return {
    MainCtrl: MainCtrl
  };

});
