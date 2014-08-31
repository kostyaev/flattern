/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('home.services', ['flattern.common']);
    mod.factory('homeService', ['$http', 'playRoutes', '$state', function ($http, playRoutes, $state) {

        return {
            getHouses: function () {
                return playRoutes.controllers.HouseCtrl.getHouses().get()
            },
            getUsers: function (page) {
                if(typeof page == 'undeined' || page < 1) {
                    page = 1;
                }

                return playRoutes.controllers.UserCtrl.getUsers(page).get()
            }

        };
    }]);

    return mod;
});
