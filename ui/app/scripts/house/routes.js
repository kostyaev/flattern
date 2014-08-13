/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('house.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('house', {
                    abstract: true,
                    parent: 'settings',
                    url: '/house',
                    views: {
                        'left': {
                            templateUrl: 'views/house/left.html'
                        },
                        'content': {
                            templateUrl: 'views/house/content.html',
                            controller: controllers.LeftCtrl

                        }
                    }
                })
                .state('house.general', {
                    url: '',
                    templateUrl: 'views/house/sections/general.html',
                    controller: controllers.GeneralCtrl
                })
                .state('house.address', {
                    templateUrl: 'views/house/sections/address.html'
                })
                .state('house.desc', {
                    templateUrl: 'views/house/sections/description.html'
                })
                .state('house.amenities', {
                    templateUrl: 'views/house/sections/amenities.html'
                })
                .state('house.photos', {
                    templateUrl: 'views/house/sections/photos.html',
                    controller: controllers.PhotosCtrl
                });



        }]);
    return mod;
});
