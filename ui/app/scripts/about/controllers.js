/**
 * User controllers.
 */
define(['angular'], function(angular) {
  'use strict';

  var AboutCtrl = function ($scope, aboutService) {
      $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
      ];
     aboutService.getPerson()
         .success(function (data) {
             $scope.person = data;
         })
         .error(function () {
             $scope.person = {
                 age : 100,
                 name : "Petya"
             };
         });
  };
  AboutCtrl.$inject = ['$scope', 'aboutService'];

  return {
    AboutCtrl: AboutCtrl
  };

});
