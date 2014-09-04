/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('general.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('main', {
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'views/general/main.html'
                        },
                        'header@main': {
                            templateUrl: 'views/general/header.html'
                        },
                        'footer@main': {
                            templateUrl: 'views/general/footer.html'
                        }
                    }
                })


        }]);
    return mod;
});
