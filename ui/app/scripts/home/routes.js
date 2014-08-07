/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('home.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('sections', {
                    url: '/',
                    parent: 'template',
                    template: '<h1> Some text </h1>'
                });
        }]);
    return mod;
});
