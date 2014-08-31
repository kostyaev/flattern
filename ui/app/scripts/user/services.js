/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('user.services', ['flattern.common']);
    mod.factory('userService', ['$http', 'playRoutes', '$state', function ($http, playRoutes, $state) {

        return {
            getConstants: function () {
                console.log('userService.getConstants');
                return playRoutes.controllers.UserCtrl.getConstants().get();
            },
            getGeneral: function () {
                console.log('userService.getGeneral');
                return playRoutes.controllers.UserCtrl.getGeneral().get();
            },
            saveGeneral: function (general) {
                return playRoutes.controllers.UserCtrl.saveGeneral().post(general).then(function(response) {
                });
            },
            getAbout: function () {
                console.log('userService.getAbout');
                return playRoutes.controllers.UserCtrl.getAbout().get();
            },
            saveAbout: function (about) {
                return playRoutes.controllers.UserCtrl.saveAbout().post(about).then(function(response) {
                });
            },
            getUserHouses: function () {
                console.log('userService.getUserHouses');
                return playRoutes.controllers.UserCtrl.getHouses().get();
            },
            getUserById: function (id) {
                console.log('userService.getUserById: ' + id);
                return playRoutes.controllers.UserCtrl.getUserById(id).get();
            }
        };
    }]);

    return mod;
});
