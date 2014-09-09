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
                    parent: 'main-scroll-fixed-top',
                    url: '',
                    templateUrl: 'views/template/index-advanced-horizontal-search.html',
                    controller: controllers.ContentCtrl
                    })
                .state('about-us', {
                    parent: 'main',
                    url: '/about-us',
                    templateUrl: 'views/template/about-us.html'
                })
                .state('agencies-listing', {
                    parent: 'main',
                    url: '/agencies-listing',
                    templateUrl: 'views/template/agencies-listing.html'
                })
                .state('agency-detail', {
                    parent: 'main',
                    url: '/agency-detail',
                    templateUrl: 'views/template/agency-detail.html'
                })
                .state('agent-detail', {
                    parent: 'main',
                    url: '/agent-detail',
                    templateUrl: 'views/template/agent-detail.html'
                })
                .state('agents-listing', {
                    parent: 'main',
                    url: '/agents-listing',
                    templateUrl: 'views/template/agents-listing.html'
                })
                .state('blog', {
                    parent: 'main',
                    url: '/blog',
                    templateUrl: 'views/template/blog.html'
                })
                .state('blog-detail', {
                    parent: 'main',
                    url: '/blog-detail',
                    templateUrl: 'views/template/blog-detail.html'
                })
                .state('bookmarked', {
                    parent: 'main',
                    url: '/bookmarked',
                    templateUrl: 'views/template/bookmarked.html'
                })
                .state('contact', {
                    parent: 'main',
                    url: '/contact',
                    templateUrl: 'views/template/contact.html'
                })
                .state('create-account', {
                    parent: 'main',
                    url: '/create-account',
                    views: {
                        '' : {
                            templateUrl: 'views/template/create-account.html'
                        },
                        'footer' : {
                            templateUrl: 'views/general/footer-min.html'
                        }
                    }
                })
                .state('create-agency', {
                    parent: 'main',
                    url: '/create-agency',
                    views: {
                        '' : {
                            templateUrl: 'views/template/create-agency.html'
                        },
                        'footer' : {
                            templateUrl: 'views/general/footer-min.html'
                        }
                    }
                })
                .state('faq', {
                    parent: 'main',
                    url: '/faq',
                    templateUrl: 'views/template/faq.html'
                })
                .state('index-advanced-horizontal-search', {
                    parent: 'main-scroll-fixed-top',
                    url: '/',
                    templateUrl: 'views/template/index-advanced-horizontal-search.html'
                })
                .state('index-google-map-fixed-height', {
                    parent: 'main-scroll',
                    url: '/index-google-map-fixed-height',
                    templateUrl: 'views/template/index-google-map-fixed-height.html'
                })
                .state('index-google-map-fixed-navigation', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-google-map-fixed-navigation',
                    templateUrl: 'views/template/index-google-map-fixed-navigation.html'
                })
                .state('index-google-map-fullscreen', {
                    parent: 'main-scroll-fixed-bottom',
                    url: '/index-google-map-fullscreen',
                    templateUrl: 'views/template/index-google-map-fullscreen.html'
                })
                .state('index-horizontal-search-floated', {
                    parent: 'main-scroll',
                    url: '/index-horizontal-search-floated',
                    templateUrl: 'views/template/index-horizontal-search-floated.html'
                })
                .state('index-osm', {
                    parent: 'main-scroll-fixed-bottom',
                    url: '/index-osm',
                    templateUrl: 'views/template/index-osm.html'
                })
                .state('index-osm-fixed-height', {
                    parent: 'main-scroll',
                    url: '/index-osm-fixed-height',
                    templateUrl: 'views/template/index-osm-fixed-height.html'
                })
                .state('index-osm-fixed-navigation', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-osm-fixed-navigation',
                    templateUrl: 'views/template/index-osm-fixed-navigation.html'
                })
                .state('index-slider', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-slider',
                    templateUrl: 'views/template/index-slider.html'
                })
                .state('index-slider-horizontal-search-box', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-slider-horizontal-search-box',
                    templateUrl: 'views/template/index-slider-horizontal-search-box.html'
                })
                .state('index-slider-horizontal-search-box-floated', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-slider-horizontal-search-box-floated',
                    templateUrl: 'views/template/index-slider-horizontal-search-box-floated.html'
                })
                .state('index-slider-search-box', {
                    parent: 'main-scroll-fixed-top',
                    url: '/index-slider-search-box',
                    templateUrl: 'views/template/index-slider-search-box.html'
                })
                .state('invoice-print', {
                    parent: 'main',
                    url: '/invoice-print',
                    views: {
                        '' : {
                            templateUrl: 'views/template/invoice-print.html'
                        },
                        'footer' : {
                            templateUrl: 'views/general/footer-min.html'
                        }
                    }
                })
                .state('left-sidebar', {
                    parent: 'main',
                    url: '/left-sidebar',
                    templateUrl: 'views/template/left-sidebar.html'
                })
                .state('my-properties', {
                    parent: 'main',
                    url: '/my-properties',
                    templateUrl: 'views/template/my-properties.html'
                })
                .state('pricing', {
                    parent: 'main',
                    url: '/pricing',
                    templateUrl: 'views/template/pricing.html'
                })
                .state('profile', {
                    parent: 'main',
                    url: '/profile',
                    templateUrl: 'views/template/profile.html'
                })
                .state('property-detail', {
                    parent: 'main',
                    url: '/property-detail',
                    templateUrl: 'views/template/property-detail.html'
                })
                .state('properties-listing', {
                    parent: 'main',
                    url: '/properties-listing',
                    templateUrl: 'views/template/properties-listing.html'
                })
                .state('properties-listing-grid', {
                    parent: 'main',
                    url: '/properties-listing-grid',
                    templateUrl: 'views/template/properties-listing-grid.html'
                })
                .state('properties-listing-lines', {
                    parent: 'main',
                    url: '/properties-listing-lines',
                    templateUrl: 'views/template/properties-listing-lines.html'
                })
                .state('right-sidebar', {
                    parent: 'main',
                    url: '/right-sidebar',
                    templateUrl: 'views/template/right-sidebar.html'
                })
                .state('shortcodes', {
                    parent: 'main',
                    url: '/shortcodes',
                    templateUrl: 'views/template/shortcodes.html'
                })
                .state('sign-in', {
                    parent: 'main',
                    url: '/sign-in',
                    views: {
                        '' : {
                            templateUrl: 'views/template/sign-in.html'
                        },
                        'footer' : {
                            templateUrl: 'views/general/footer-min.html'
                        }
                    }
                })
                .state('sticky-footer', {
                    parent: 'main',
                    url: '/sticky-footer',
                    templateUrl: 'views/template/sticky-footer.html'
                })
                .state('submit', {
                    parent: 'main',
                    url: '/submit',
                    templateUrl: 'views/template/submit.html'
                })
                .state('terms-conditions', {
                    parent: 'main',
                    url: '/terms-conditions',
                    templateUrl: 'views/template/terms-conditions.html'
                })
                .state('thank-you', {
                    parent: 'main',
                    url: '/thank-you',
                    templateUrl: 'views/template/thank-you.html'
                })
                .state('timeline', {
                    parent: 'main',
                    url: '/timeline',
                    templateUrl: 'views/template/timeline.html'
                })
                .state('403', {
                    parent: 'main',
                    url: '/403',
                    templateUrl: 'views/template/403.html'
                })
                .state('404', {
                    parent: 'main',
                    url: '/404',
                    templateUrl: 'views/template/404.html'
                })
                .state('500', {
                    parent: 'main',
                    url: '/500',
                    templateUrl: 'views/template/500.html'
                })

        }]);

    return mod;
});
