/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('house.routes', ['flattern.common']);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('house', {
                    abstract: true,
                    parent: 'settings',
                    url: '/house',
                    views: {
                        'left': {
                            templateUrl: 'views/house/left.html',
                            controller: controllers.LeftCtrl

                        },
                        'content': {
                            templateUrl: 'views/house/content.html',
                            controller: controllers.ContentCtrl
                        }
                    }
                })
                .state('house.general', {
                    url: '',
                    templateUrl: 'views/house/sections/general.html',
                    controller: controllers.GeneralCtrl
                })
                .state('house.address', {
                    templateUrl: 'views/house/sections/address.html',
                    controller: controllers.AddressCtrl
                })
                .state('house.desc', {
                    templateUrl: 'views/house/sections/description.html'
                })
                .state('house.amenities', {
                    templateUrl: 'views/house/sections/amenities.html',
                    controller: controllers.AmenitiesCtrl
                })
                .state('house.photos', {
                    templateUrl: 'views/house/sections/photos.html',
                    controller: controllers.PhotosCtrl
                });



        }]);
    return mod;
});
