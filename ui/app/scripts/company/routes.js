/**
 * Configure routes of user module.
 */
define(['angular'], function(angular) {
    'use strict';
    var mod = angular.module('company.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('blog', {
                    parent: 'main',
                    url: '/blog',
                    templateUrl: 'views/company/blog.html'
                })
                .state('blog-detail', {
                    parent: 'main',
                    url: '/blog-detail',
                    templateUrl: 'views/company/blog-detail.html'
                })
                .state('contact', {
                    parent: 'main',
                    url: '/contact',
                    templateUrl: 'views/company/contact.html'
                })
                .state('about-us', {
                    parent: 'main',
                    url: '/about-us',
                    templateUrl: 'views/company/about-us.html'
                })
                .state('faq', {
                    parent: 'main',
                    url: '/faq',
                    templateUrl: 'views/company/faq.html'
                })
        }]);

    return mod;
});
