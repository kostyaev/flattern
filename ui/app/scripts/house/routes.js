/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('house.routes', ['flattern.common']);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('property', {
                    abstract: true,
                    parent: 'main',
                    url: '/property',
                    template: '<div ui-view></div>',
                    controller: controllers.HouseCtrl
                })

                .state('submit', {
                    parent: 'property',
                    url: '/submit',
                    templateUrl: 'views/house/submit.html',
                    controller: controllers.CreateCtrl
                })
                .state('property-edit', {
                    parent: 'property',
                    url: '/:id/edit',
                    templateUrl: 'views/house/submit.html',
                    controller: controllers.EditCtrl
                })
                .state('property-detail', {
                    parent: 'property',
                    url: '/:id/detail',
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

        }]);

    return mod;
});
