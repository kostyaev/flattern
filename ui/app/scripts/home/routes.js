/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('home.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'views/main.html',
                    controller:controllers.MainCtrl
                })
        }]);
    return mod;
});
