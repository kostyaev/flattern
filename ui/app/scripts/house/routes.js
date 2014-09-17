/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('house.routes', ['flattern.common']);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('property-detail', {
                    parent: 'main',
                    url: '/property-detail',
                    templateUrl: 'views/house/property-detail.html'
                })
                .state('properties-listing', {
                    parent: 'main',
                    url: '/properties-listing',
                    templateUrl: 'views/house/properties-listing.html'
                })
                .state('properties-listing-grid', {
                    parent: 'main',
                    url: '/properties-listing-grid',
                    templateUrl: 'views/house/properties-listing-grid.html'
                })
                .state('properties-listing-lines', {
                    parent: 'main',
                    url: '/properties-listing-lines',
                    templateUrl: 'views/house/properties-listing-lines.html'
                })
                .state('submit', {
                    parent: 'main',
                    url: '/submit',
                    templateUrl: 'views/house/submit.html'
                })


        }]);

    return mod;
});
