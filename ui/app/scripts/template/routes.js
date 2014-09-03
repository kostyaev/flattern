/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('template.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('home', {
                    url: '',
                    views: {
                        '': {
                            templateUrl: 'views/template/index-advanced-horizontal-search.html',
                            controller: controllers.ContentCtrl
                        },
                        'header@home': {
                            templateUrl: 'views/general/header.html'
                        },
                        'footer@home': {
                            templateUrl: 'views/general/footer.html'
                        }
                    }
                })



        }]);

    return mod;
});
