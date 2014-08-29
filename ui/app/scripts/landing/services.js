/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('landing.services', ['flattern.common']);
    mod.factory('landingService', ['$http', 'playRoutes', '$state', function ($http, playRoutes, $state) {

        return {
            send: function (data) {
                return playRoutes.controllers.LandingCtrl.send().post(data)
            }
        };
    }]);

    return mod;
});
