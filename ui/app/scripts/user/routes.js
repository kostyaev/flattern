/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('user.routes', ['flattern.common']);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('user', {
                    abstract: true,
                    parent: 'main',
                    template: '<div ui-view></div>',
                    controller: controllers.UserCtrl
                })
                
                .state('agent-detail', {
                    parent: 'user',
                    url: '/agent-detail',
                    templateUrl: 'views/user/agent-detail.html'
                })
                .state('agents-listing', {
                    parent: 'user',
                    url: '/agents-listing',
                    templateUrl: 'views/user/agents-listing.html'
                })
                .state('timeline', {
                    parent: 'user',
                    url: '/timeline',
                    templateUrl: 'views/user/timeline.html'
                })
                .state('bookmarked', {
                    parent: 'user',
                    url: '/bookmarked',
                    templateUrl: 'views/user/bookmarked.html'
                })
                .state('profile', {
                    parent: 'user',
                    url: '/profile',
                    templateUrl: 'views/user/profile.html'
                })
                .state('my-properties', {
                    parent: 'user',
                    url: '/my-properties',
                    templateUrl: 'views/user/my-properties.html',
                    controller: controllers.PropertiesCtrl
                })
        }]);

    return mod;
});
