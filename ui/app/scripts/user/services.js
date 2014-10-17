/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('user.services', ['flattern.common']);
    mod.factory('userService', ['$http', 'playRoutes', '$state', function ($http, playRoutes, $state) {

        return {
            getAccountUser: function (id) {
                console.log('userService.getAccountUser');
                return playRoutes.controllers.UserCtrl.getAccountUser(id).get();
            },

            saveGeneral: function (general) {
                return playRoutes.controllers.UserCtrl.saveGeneral().post(general).then(function(response) {
                });
            }
        };
    }]);

    return mod;
});
