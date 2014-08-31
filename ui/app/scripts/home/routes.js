/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('home.routes', []);
    mod.config(['$stateProvider', 'USER_ROLES',
        function($stateProvider, USER_ROLES)  {
            $stateProvider
                .state('registered.home', {
                    abstract: 'true',
                    url: '',
                    views: {
                        '': {
                            templateUrl: 'views/home/home.html',
                            controller: controllers.ContentCtrl
                        },
                        'navigation@registered.home': {
                            templateUrl: 'views/home/navigation.html'
                        }
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.editor]
                    }
                })

                .state('registered.home.houses', {
                    url: '/houses',
                    views: {
                        'left': {
                            templateUrl: 'views/home/houses/left.html',
                            controller: controllers.LeftCtrl
                        },
                        'content': {
                            templateUrl: 'views/home/houses/content.html',
                            controller: controllers.HousesCtrl
                        }
                    }
                })
                .state('registered.home.users', {
                    url: '',
                    views: {
                        'left': {
                            templateUrl: 'views/home/users/left.html',
                            controller: controllers.LeftCtrl
                        },
                        'content': {
                            templateUrl: 'views/home/users/content.html'
                        }
                    }
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
