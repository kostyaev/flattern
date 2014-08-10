/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
  'use strict';

  var mod = angular.module('about.services', ['flattern.common']);
  mod.factory('aboutService', ['$http', 'playRoutes', function ($http, playRoutes) {

    /* If the token is assigned, check that the token is still valid on the server */

    return {
      getPerson: function () {
          console.log(playRoutes);
          return playRoutes.controllers.Test.test().get()

      }
    };
  }]);

  return mod;
});
