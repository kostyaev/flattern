/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('house.routes', ['flattern.common']);
    mod.config(['$stateProvider','USER_ROLES',
        function($stateProvider, USER_ROLES)  {
            $stateProvider
                .state('create-house', {
                    url: '/house/create',
                    controller: controllers.CreateCtrl,
                    data: {
                        authorizedRoles: [USER_ROLES.editor]
                    }

                })
                .state('house', {
                    abstract: true,
                    parent: 'settings',
                    url: '/house/:id',
                    data: {
                        authorizedRoles: [USER_ROLES.editor]
                    },
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
                    url: '/address',
                    templateUrl: 'views/house/sections/address.html',
                    controller: controllers.AddressCtrl
                })
                .state('house.desc', {
                    url: '/desc',
                    templateUrl: 'views/house/sections/description.html',
                    controller: controllers.DescCtrl
                })
                .state('house.amenities', {
                    url: '/amenities',
                    templateUrl: 'views/house/sections/amenities.html',
                    controller: controllers.AmenitiesCtrl
                })
                .state('house.photos', {
                    url: '/photos',
                    templateUrl: 'views/house/sections/photos.html',
                    controller: controllers.PhotosCtrl

                });



        }]);
    mod.constant('USER_ROLES', {
        all   : '*',
        admin : 'admin',
        editor: 'editor',
        guest : 'guest'
    });
    return mod;
});
