/**
 * User controllers.
 */
define(['angular'], function(angular) {
  'use strict';

  var AboutCtrl = function ($scope) {
      $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
      ];
  };
  AboutCtrl.$inject = ['$scope'];

  return {
    AboutCtrl: AboutCtrl
  };

});
