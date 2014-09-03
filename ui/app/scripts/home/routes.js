/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('home.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('main.home', {
                    url: '',
                    views: {
                        '': {
                            templateUrl: 'views/home/fixed-header.html',
                            controller: controllers.ContentCtrl
                        }
                    }
                })


        }]);

    return mod;
});
