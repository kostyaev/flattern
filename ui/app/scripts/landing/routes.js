/**
 * Configure routes of user module.
 */
define(['angular', './controllers', 'common'], function(angular, controllers) {
    'use strict';
    var mod = angular.module('landing.routes', ['flattern.common']);
    mod.config(['$stateProvider','USER_ROLES',
        function($stateProvider, USER_ROLES)  {
            $stateProvider
                .state('landing', {
                    abstract: true,
                    url: '',
                    data: {
                        authorizedRoles: [USER_ROLES.guest, USER_ROLES.editor]
                    },
                    views: {
                        '': {
                            templateUrl: 'views/landing/content.html',
                            controller: controllers.LandingCtrl
                        },
                        'footer': {
                            templateUrl: 'views/general/footer.html'
                        }
                    }

                })
                .state('landing.index', {
                    url: '/landing',
                    templateUrl: 'views/landing/index.html',
                    controller: controllers.LandingCtrl
                });
        }]);
    mod.constant('USER_ROLES', {
        all   : '*',
        admin : 'admin',
        editor: 'editor',
        guest : 'guest'
    });
    return mod;
});
