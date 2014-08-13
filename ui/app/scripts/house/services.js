/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
  'use strict';

  var mod = angular.module('house.services', ['flattern.common']);
  mod.factory('houseService', ['$http', 'playRoutes', function ($http, playRoutes) {

    return {
      saveGeneral: function (house) {
          return playRoutes.controllers.HouseCtrl.saveGeneral().post(house).then(function(response) {
              console.log(response);
          });
      }
    };
  }]);

  return mod;
});
