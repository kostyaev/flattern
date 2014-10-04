/**
 * Configure routes of user module.
 */
define(['angular', './controllers'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('auth.routes', []);
    mod.config(['$stateProvider', 'USER_ROLES',
        function($stateProvider, USER_ROLES)  {
            $stateProvider
                .state('sign-in', {
                    parent: 'main',
                    url: '/sign-in',
                    controller:controllers.LoginCtrl,
                    views: {
                        '' : {
                            templateUrl: 'views/auth/sign-in.html'
                        },
                        'footer' : {
                            templateUrl: 'views/general/footer-min.html'
                        }
                    },
                    data: {
                        authorizedRoles: [USER_ROLES.guest]
                    }
                })
                .state('logout', {
                    url: '/logout',
                    templateUrl: 'views/auth/login.html',
                    controller: controllers.LogoutCtrl,
                    data: {
                        authorizedRoles: [USER_ROLES.editor]
                    }
                })
                .state('password-change', {
                    url: '/password/change',
                    templateUrl: 'views/auth/password-change.html',
                    controller:controllers.PasswordCtrl,
                    data: {
                        authorizedRoles: [USER_ROLES.editor]
                    }
                })
                .state('password-reset-start', {
                    url: '/password/reset',
                    templateUrl: 'views/auth/password-reset-start.html',
                    controller:controllers.PasswordCtrl,
                    data: {
                        authorizedRoles: [USER_ROLES.guest]
                    }
                })
                .state('password-reset', {
                    url: '/password/reset/:token',
                    templateUrl: 'views/auth/password-reset.html',
                    controller:controllers.PasswordCtrl,
                    data: {
                        authorizedRoles: [USER_ROLES.guest]
                    }
                })
                .state('signup-start', {
                    url: '/signup',
                    templateUrl: 'views/auth/sign-up-start.html',
                    controller:controllers.SignUpCtrl,
                    data: {
                        authorizedRoles: [USER_ROLES.guest]
                    }
                })
                .state('signup', {
                    url: '/signup/:token',
                    templateUrl: 'views/auth/sign-up.html',
                    controller:controllers.SignUpCtrl,
                    data: {
                        authorizedRoles: [USER_ROLES.guest]
                    }
                })
        }]);
    mod.constant('USER_ROLES', {
        all   : '*',
        admin : 'admin',
        editor: 'editor',
        guest : 'guest'
    });
    return mod;
});
