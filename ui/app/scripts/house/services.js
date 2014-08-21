/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('house.services', ['flattern.common']);
    mod.factory('houseService', ['$http', 'playRoutes', function ($http, playRoutes) {

        return {
            getConstants: function () {
                console.log('send constants');
                return playRoutes.controllers.HouseCtrl.getConstants().get()
            },
            getGeneral: function (id) {
                console.log('send general id: ' + id);
                return playRoutes.controllers.HouseCtrl.getGeneral(id).get()
            },
            saveGeneral: function (id, general) {
                return playRoutes.controllers.HouseCtrl.saveGeneral(id).post(general).then(function(response) {
                });
            },
            getAddress: function(id) {
                console.log('send address');
                return playRoutes.controllers.HouseCtrl.getAddress(id).get()
            },
            getAmenities: function (id) {
                return playRoutes.controllers.HouseCtrl.getAmenities(id).get()
            },
            saveAmenities: function (id, amenities) {
                return playRoutes.controllers.HouseCtrl.saveAmenities(id).post(amenities).then(function(response) {
                });
            }

        };
    }]);

    return mod;
});
