/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('home.services', ['flattern.common']);
    mod.factory('homeService', ['$http', 'playRoutes', '$state', function ($http, playRoutes) {

        return {
            getHouses: function () {
                return playRoutes.controllers.HouseCtrl.getHouses().get()
            }

        };
    }]);

    return mod;
});
