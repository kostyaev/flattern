/**
 * User service, exposes user model to the rest of the app.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('house.services', ['flattern.common']);
    mod.factory('houseService', ['$http', 'playRoutes', function ($http, playRoutes) {

        return {
            getConstants: function () {
                return playRoutes.controllers.HouseCtrl.getConstants().get()
            },
            getGeneral: function () {
                return playRoutes.controllers.HouseCtrl.getGeneral().get()
            },
            saveGeneral: function (general) {
                return playRoutes.controllers.HouseCtrl.saveGeneral().post(general).then(function(response) {
                    console.log(response);
                });
            },
            getAddress: function() {
                return playRoutes.controllers.HouseCtrl.getAddress().get()
            },
            getAmenities: function () {
                return playRoutes.controllers.HouseCtrl.getAmenities().get()
            },
            saveAmenities: function (amenities) {
                return playRoutes.controllers.HouseCtrl.saveAmenities().post(amenities).then(function(response) {
                    console.log(response);
                });
            }




        };
    }]);

    return mod;
});
