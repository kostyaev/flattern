/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('auth.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/auth/login.html',
                    controller:controllers.LoginCtrl
                })
                .state('logout', {
                    url: '/logout',
                    templateUrl: 'views/auth/login.html',
                    controller: controllers.LoginCtrl.logout
                })
                .state('password-change', {
                    url: '/password/change',
                    templateUrl: 'views/auth/password-change.html',
                    controller:controllers.PasswordCtrl
                })
                .state('password-reset-start', {
                    url: '/password/reset',
                    templateUrl: 'views/auth/password-reset-start.html',
                    controller:controllers.PasswordCtrl
                })
                .state('password-reset', {
                    url: '/password/reset/:token',
                    templateUrl: 'views/auth/password-reset.html',
                    controller:controllers.PasswordCtrl
                })
                .state('signup-start', {
                    url: '/signup',
                    templateUrl: 'views/auth/signup-start.html',
                    controller:controllers.SignUpCtrl
                })
                .state('signup', {
                    url: '/signup/:token',
                    templateUrl: 'views/auth/signup.html',
                    controller:controllers.SignUpCtrl
                })
        }]);
    return mod;
});
