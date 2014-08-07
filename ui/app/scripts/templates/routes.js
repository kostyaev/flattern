/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('templates.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('template', {
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'views/main.html'
                        },
                        'header': {
                            templateUrl: 'views/templates/header.html'
                        },
                        'footer': {
                            templateUrl: 'views/templates/footer.html'
                        }
                    }

                });

        }]);
    return mod;
});
