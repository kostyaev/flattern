/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('general.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('registered', {
                    abstract: true,
                    views: {
                        '': {
                            template: '<div ui-view></div>'
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
