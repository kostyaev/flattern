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
                            templateUrl: 'views/general/header.html'
                        },
                        'footer': {
                            templateUrl: 'views/general/footer.html'
                        }
                    }

                })
                .state('settings', {
                    parent: 'registered',
                    abstract: true,
                    templateUrl: 'views/general/settings.html'

                });

        }]);
    return mod;
});
