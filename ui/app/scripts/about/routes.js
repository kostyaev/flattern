/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('about.routes', ['about.services','flattern.common']);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html',
                    controller:controllers.AboutCtrl
                })
        }]);
    return mod;
});
