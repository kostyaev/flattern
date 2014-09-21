/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('general.routes', []);
    mod.config(['$stateProvider',
        function($stateProvider)  {
            $stateProvider
                .state('main', {
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'views/general/main.html'
                        },
                        'header@main': {
                            templateUrl: 'views/general/header.html',
                            controller: controllers.HeaderCtrl
                        },
                        'footer@main': {
                            templateUrl: 'views/general/footer.html'
                        }
                    }
                })

                .state('main-scroll-fixed-top', {
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'views/general/main-scroll-fixed-top.html'
                        },
                        'header@main-scroll-fixed-top': {
                            templateUrl: 'views/general/header.html',
                            controller: controllers.HeaderCtrl

                        },
                        'footer@main-scroll-fixed-top': {
                            templateUrl: 'views/general/footer.html'
                        }
                    }
                })

                .state('main-scroll-fixed-bottom', {
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'views/general/main-scroll-fixed-bottom.html'
                        },
                        'header@main-scroll-fixed-bottom': {
                            templateUrl: 'views/general/header.html',
                            controller: controllers.HeaderCtrl

                        },
                        'footer@main-scroll-fixed-bottom': {
                            templateUrl: 'views/general/footer.html'
                        }
                    }
                })

                .state('main-scroll', {
                    abstract: true,
                    views: {
                        '': {
                            templateUrl: 'views/general/main-scroll.html'
                        },
                        'header@main-scroll': {
                            templateUrl: 'views/general/header.html',
                            controller: controllers.HeaderCtrl

                        },
                        'footer@main-scroll': {
                            templateUrl: 'views/general/footer.html'
                        }
                    }
                })


        }]);
    return mod;
});
