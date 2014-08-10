/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('auth.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('not-logged', {
                    url: '/login',
                    templateUrl: 'views/auth/login.html',
                    controller:controllers.LoginCtrl
                })
        }]);
    return mod;
});
