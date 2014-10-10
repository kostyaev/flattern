/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('house.services', ['flattern.common']);
    mod.factory('houseService', ['$http', 'playRoutes', '$state', function ($http, playRoutes, $state) {

        return {
            getHouse: function (id) {
                return playRoutes.controllers.HouseCtrl.getHouse(id).get()
            },
            saveHouse: function (house) {
                return playRoutes.controllers.HouseCtrl.saveHouse().post(house)
            },

            getConstants: function () {
                return playRoutes.controllers.HouseCtrl.getConstants().get()
            },
            createHouse: function () {
                return playRoutes.controllers.HouseCtrl.createHouse().post().then(function(response) {
                    $state.go('house.general', {id: response.data});
                });
            },
            getGeneral: function (id) {
                return playRoutes.controllers.HouseCtrl.getGeneral(id).get()
            },
            saveGeneral: function (id, general) {
                return playRoutes.controllers.HouseCtrl.saveGeneral(id).post(general).then(function(response) {
                });
            },
            getAddress: function(id) {
                return playRoutes.controllers.HouseCtrl.getAddress(id).get()
            },
            saveAddress: function(id, address) {
                return playRoutes.controllers.HouseCtrl.saveAddress(id).post(address)
            },
            getDesc: function(id) {
                return playRoutes.controllers.HouseCtrl.getDesc(id).get()
            },
            saveDesc: function(id, desc) {
                return playRoutes.controllers.HouseCtrl.saveDesc(id).post(desc)
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
