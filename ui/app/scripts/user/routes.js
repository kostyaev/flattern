/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('user.routes', ['flattern.common']);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('agent-detail', {
                    parent: 'main',
                    url: '/agent-detail',
                    templateUrl: 'views/user/agent-detail.html'
                })
                .state('agents-listing', {
                    parent: 'main',
                    url: '/agents-listing',
                    templateUrl: 'views/user/agents-listing.html'
                })
                .state('timeline', {
                    parent: 'main',
                    url: '/timeline',
                    templateUrl: 'views/user/timeline.html'
                })
                .state('bookmarked', {
                    parent: 'main',
                    url: '/bookmarked',
                    templateUrl: 'views/user/bookmarked.html'
                })
                .state('profile', {
                    parent: 'main',
                    url: '/profile',
                    templateUrl: 'views/user/profile.html'
                })
                .state('my-properties', {
                    parent: 'main',
                    url: '/my-properties',
                    templateUrl: 'views/user/my-properties.html'
                })
        }]);

    return mod;
});
