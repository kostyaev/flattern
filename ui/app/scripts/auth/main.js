/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers', './services'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('flattern.auth', ['ui.router', 'auth.routes', 'auth.services', 'ngAnimate', 'http-auth-interceptor']);
    mod.controller('AuthCtrl', controllers.AuthCtrl);
    mod.controller('LoginCtrl', controllers.LoginCtrl);
    mod.controller('SignUpCtrl', controllers.SignUpCtrl);
    mod.controller('PasswordCtrl', controllers.PasswordCtrl);

    mod.constant('AUTH_EVENTS', {
        loginConfirmed: 'event:auth-loginConfirmed',
        loginCancelled: 'event:auth-loginCancelled',
        loginRequired : 'event:auth-loginRequired',
        sendEmailReset: 'event:auth-sendEmailReset',
        checkAuth     : 'event:auth-checkAuth',
        loginMessage  : 'event:auth-loginMessage',
        targetMessage : 'event:auth-targetMessage',
        currentMessage: 'event:auth-currentMessage'
    });

    mod.constant('USER_ROLES', {
        all   : '*',
        admin : 'admin',
        editor: 'editor',
        guest : 'guest'
    });


    // uncomment to enble auth
    mod.run(function ($rootScope, $state, $location, AUTH_EVENTS, USER_ROLES, authService, authServices, Session) {
        $rootScope.userSession = Session.session;
        var history = [];
        $rootScope.$on('$stateChangeStart', function (event, next) {
            history.push(next);
            var authorizedRoles = next.data.authorizedRoles;
            if (!authServices.isAuthorized(authorizedRoles)) {
                if (authServices.isAuthenticated()) {
                    event.preventDefault();
                    $rootScope.$scope.form = {
                        errors: { message: 'У вас недостаточно прав для просмотра данной страницы'}
                    };
                    $state.go('login');
                } else {
                    Session.create('', '', USER_ROLES.guest);
                    if (!authServices.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        // user is not logged in
                        authServices.checkAuth()
                            .success(function(response) {
                                Session.create(response.id, response.fullName, USER_ROLES.editor, response.avatarUrl);
                                var nextState = history.pop().name || 'registered.home.houses';
                                $state.go(nextState);
                            }).error(function(response) {
                                Session.create('', '', USER_ROLES.guest);
                                response.currentScope.form = {
                                    errors: { message: 'Для просмотра данной страницы необходимо авторизоваться'}
                                };
                                $state.go('login');
                            });
                    }
                }
            }
        });

        $rootScope.$on(AUTH_EVENTS.loginRequired, function(response) {
            Session.create('', '', USER_ROLES.guest);
            if($location.$$path !== '/login') {
                response.currentScope.form = {
                    errors: { message: 'Для просмотра данной страницы необходимо авторизоваться'}
                };
            }
            $state.go('login');
        });

        $rootScope.$on(AUTH_EVENTS.loginCancelled, function(response) {
            Session.create('', '', USER_ROLES.guest);
            if($location.$$path !== '/login') {
                response.currentScope.form = {
                    errors: { message: 'Для просмотра данной страницы необходимо авторизоваться'}
                };
            }
            $state.go('login');
        });

        $rootScope.$on(AUTH_EVENTS.loginMessage, function(event, msg) {
            console.log(event);
            event.targetScope.form = {
                errors: {
                    infomessage: msg.infomessage || '',
                    message: msg.message || ''
                }
            };
        });

        $rootScope.$on(AUTH_EVENTS.currentMessage, function(event, msg) {
            console.log(event);
            event.currentScope.form = {
                errors: {
                    infomessage: msg.infomessage || '',
                    message: msg.message || ''
                }
            };
        });

        $rootScope.$on(AUTH_EVENTS.checkAuth, function() {
            authServices.checkAuth()
                .success(function() {

                }).error(function(response) {
                    Session.create('', '', USER_ROLES.guest);
                    response.currentScope.form = {
                        errors: { message: 'Неверный токен'}
                    };
                });
        });
    });

    return mod;
});
