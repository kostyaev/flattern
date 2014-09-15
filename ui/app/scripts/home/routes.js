/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('home.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('homepage', {
                    parent: 'main-scroll-fixed-top',
                    url: '',
                    templateUrl: 'views/home/index-advanced-horizontal-search.html'
                })
                .state('index-advanced-horizontal-search', {
                    parent: 'main-scroll-fixed-top',
                    url: '/',
                    templateUrl: 'views/home/index-advanced-horizontal-search.html'
                })
                .state('index-google-map-fixed-height', {
                    parent: 'main-scroll',
                    url: '/index-google-map-fixed-height',
                    templateUrl: 'views/home/index-google-map-fixed-height.html'
                })
                .state('index-google-map-fixed-navigation', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-google-map-fixed-navigation',
                    templateUrl: 'views/home/index-google-map-fixed-navigation.html'
                })
                .state('index-google-map-fullscreen', {
                    parent: 'main-scroll-fixed-bottom',
                    url: '/index-google-map-fullscreen',
                    templateUrl: 'views/home/index-google-map-fullscreen.html'
                })
                .state('index-horizontal-search-floated', {
                    parent: 'main-scroll',
                    url: '/index-horizontal-search-floated',
                    templateUrl: 'views/home/index-horizontal-search-floated.html'
                })
                .state('index-osm', {
                    parent: 'main-scroll-fixed-bottom',
                    url: '/index-osm',
                    templateUrl: 'views/home/index-osm.html'
                })
                .state('index-osm-fixed-height', {
                    parent: 'main-scroll',
                    url: '/index-osm-fixed-height',
                    templateUrl: 'views/home/index-osm-fixed-height.html'
                })
                .state('index-osm-fixed-navigation', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-osm-fixed-navigation',
                    templateUrl: 'views/home/index-osm-fixed-navigation.html'
                })
                .state('index-slider', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-slider',
                    templateUrl: 'views/home/index-slider.html'
                })
                .state('index-slider-horizontal-search-box', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-slider-horizontal-search-box',
                    templateUrl: 'views/home/index-slider-horizontal-search-box.html'
                })
                .state('index-slider-horizontal-search-box-floated', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-slider-horizontal-search-box-floated',
                    templateUrl: 'views/home/index-slider-horizontal-search-box-floated.html'
                })
                .state('index-slider-search-box', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-slider-search-box',
                    templateUrl: 'views/home/index-slider-search-box.html'
                });
        }]);

    return mod;
});
