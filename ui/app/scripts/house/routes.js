/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('home.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('registered.house', {
                    url: '/house',
                    views: {
                        'left@registered.house': {
                            templateUrl: 'views/house/left.html'
                        },
                        'content@registered.house': {
                            templateUrl: 'views/house/content.html'
                        }
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
                            templateUrl: 'views/home/houses/content.html'
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
    return mod;
});
