/**
 * User controllers.
 */
define(['angular'], function(angular) {
  'use strict';

  var AuthCtrl = function ($scope) {
      $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
      ];
  };
  AuthCtrl.$inject = ['$scope'];

  return {
    AuthCtrl: AuthCtrl
  };

});
