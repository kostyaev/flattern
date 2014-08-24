/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('user.routes', ['flattern.common']);
    mod.config(['$stateProvider','USER_ROLES',
        function($stateProvider, USER_ROLES)  {
            $stateProvider
                .state('user', {
                    abstract: true,
                    parent: 'settings',
                    url: '/user/edit',
                    data: {
                        authorizedRoles: [USER_ROLES.editor]
                    },
                    views: {
                        'left': {
                            templateUrl: 'views/user/left.html',
                            controller: controllers.LeftCtrl

                        },
                        'content': {
                            templateUrl: 'views/user/content.html',
                            controller: controllers.ContentCtrl
                        }
                    }

                })

                .state('user.general', {
                    url: '',
                    templateUrl: 'views/user/sections/general.html',
                    controller: controllers.GeneralCtrl
                })
                .state('user.about', {
                    url: '/about',
                    templateUrl: 'views/user/sections/about.html',
                    controller: controllers.AboutCtrl
                });
                /*.state('user.address', {
                    url: '/address',
                    templateUrl: 'views/user/sections/address.html',
                    controller: controllers.AddressCtrl
                })
                .state('user.desc', {
                    url: '/desc',
                    templateUrl: 'views/user/sections/description.html'
                })
                .state('user.amenities', {
                    url: '/amenities',
                    templateUrl: 'views/user/sections/amenities.html',
                    controller: controllers.AmenitiesCtrl
                })
                .state('user.photos', {
                    url: '/photos',
                    templateUrl: 'views/user/sections/photos.html',
                    controller: controllers.PhotosCtrl

                });*/



        }]);
    mod.constant('USER_ROLES', {
        all   : '*',
        admin : 'admin',
        editor: 'editor',
        guest : 'guest'
    });
    return mod;
});
