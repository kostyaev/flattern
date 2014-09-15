/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('template.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
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

                .state('pricing', {
                    parent: 'main',
                    url: '/pricing',
                    templateUrl: 'views/template/pricing.html'
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
