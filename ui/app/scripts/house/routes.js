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


                .state('property.profile', {
                    abstract: true,
                    url: '/:id/edit',
                    views: {
                        '' : {
                            templateUrl: 'views/house/profile/profile.html',
                            controller: controllers.EditCtrl
                        },
                        'sidebar@property.profile' : {
                            templateUrl: 'views/house/profile/sidebar.html'
                        }
                    }
                })
                .state('property.profile.general', {
                    url: '/general',
                    views: {
                        '' : {
                            templateUrl: 'views/house/profile/sections/general.html',
                            controller: controllers.GeneralCtrl
                        },
                        'section' : {
                            template: 'General information'
                        }
                    }
                })
                .state('property.profile.basic', {
                    url: '/basic',
                    views: {
                        '' : {
                            templateUrl: 'views/house/profile/sections/basic.html'
                        },
                        'section' : {
                            template: 'Basic information'
                        }
                    }
                })
                .state('property.profile.address', {
                    url: '/address',
                    views: {
                        '' : {
                            templateUrl: 'views/house/profile/sections/address.html'
                        },
                        'section' : {
                            template: 'Address'
                        }
                    }
                })
                .state('property.profile.amenities', {
                    url: '/amenities',
                    views: {
                        '' : {
                            templateUrl: 'views/house/profile/sections/amenities.html'
                        },
                        'section' : {
                            template: 'Amenities'
                        }
                    }
                })
                .state('property.profile.photos', {
                    url: '/photos',
                    views: {
                        '' : {
                            templateUrl: 'views/house/profile/sections/photos.html'
                        },
                        'section' : {
                            template: 'Photos'
                        }
                    }
                })

        }]);

    return mod;
});
