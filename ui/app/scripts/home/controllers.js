/**
 * User controllers.
 */
define(['angular', 'jquery'], function(angular, $) {
    'use strict';

  var LeftCtrl = function ($scope) {
      $scope.$on('$viewContentLoaded', function(){
          $("select").selecter();
          $("input[type=checkbox], input[type=radio]").picker();
      });
  };

  LeftCtrl.$inject = ['$scope'];

  return {
    LeftCtrl: LeftCtrl
  };

});
