/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('user.services', ['flattern.common']);
    mod.factory('userService', ['$http', 'playRoutes', '$state', function ($http, playRoutes, $state) {

        return {
            getConstants: function () {
                console.log('send constants');
                return playRoutes.controllers.UserCtrl.getConstants().get()
            },
            getGeneral: function() {
                console.log('send general');
                return playRoutes.controllers.UserCtrl.getGeneral().get()
            },
            saveGeneral: function (general) {
                return playRoutes.controllers.UserCtrl.saveGeneral().post(general).then(function(response) {
                });
            },
            getAbout: function() {
                console.log('send about');
                return playRoutes.controllers.UserCtrl.getAbout().get()
            },
            saveAbout: function (general) {
                return playRoutes.controllers.UserCtrl.saveAbout().post(general).then(function(response) {
                });
            }
        };
    }]);

    return mod;
});
