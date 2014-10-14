/**
 * User controllers.
 */
define(['angular'], function(angular) {
    'use strict';

    var AuthCtrl = function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    };
    AuthCtrl.$inject = ['$scope'];

    var SignUpCtrl = function ($scope, authServices, $state, $stateParams) {
        $scope.form = $scope.form || {};
        $scope.$parent.form = $scope.$parent.form || {};
        $scope.$parent.form.errors = $scope.$parent.form.errors || {};

        $scope.sendEmail = function () {
            authServices.sendEmail($scope.form)
                .success(function () {
                    $scope.form.infomessage =
                        'Спасибо за регистрацию! Email с подробными инструкциями был выслан вам на почту';

                    $state.go('sign-in');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                })
        };

        $scope.signUp = function () {
            authServices.signUp($scope.form, $stateParams.token)
                .success(function () {
                    $state.go('sign-in');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                    if (response['password'])
                        $scope.form.errors['password.password2'] = response['password'];
                });
        };
    };
    SignUpCtrl.$inject = ['$scope', 'authServices', '$state', '$stateParams'];

    var LoginCtrl = function ($scope, $rootScope, authServices, $state, authService, AUTH_EVENTS, USER_ROLES, Session) {
        $scope.form = $scope.form || {};
        $scope.$parent.form = $scope.$parent.form || {};


        $scope.login = function () {
            console.log($scope.form);
            authServices.login($scope.form)
                .success(function (response) {
                    authService.loginConfirmed();
                    $state.go('homepage');
                })
                .error(function (response) {
                    authService.loginCancelled();
                    $scope.$parent.form.errors = response;
                });
        };

        $scope.logout = function () {
            authServices.logout()
                .success(function () {
                    authService.loginCancelled();
                    $state.go('sign-in');
                })
                .error(function (response) {
                    authService.loginCancelled();
                    $state.go('sign-in');
                })
        };
    };
    LoginCtrl.$inject = ['$scope', '$rootScope', 'authServices', '$state', 'authService', 'AUTH_EVENTS', 'USER_ROLES', 'Session'];

    var LogoutCtrl = function ($scope, $rootScope, authServices, $state, authService, AUTH_EVENTS, USER_ROLES, Session) {
        authServices.logout()
            .success(function () {
                $scope.form = {
                    errors: { infomessage: 'Вы усепшно вышли из системы'}
                };
                authService.loginCancelled();
                $state.go('sign-in');
            })
            .error(function (response) {
                $scope.form = {
                    errors: { message: 'Произошла ошибка при выполнении операции, обратитесь в техническую поддержку'}
                };
                authService.loginCancelled();
                $state.go('sign-in');
            });
    };
    LogoutCtrl.$inject = ['$scope', '$rootScope', 'authServices', '$state', 'authService', 'AUTH_EVENTS', 'USER_ROLES', 'Session'];

    var PasswordCtrl = function ($scope, $rootScope, authServices, $state, $stateParams, AUTH_EVENTS) {
        // clear form
        //$scope.form = {};
        $scope.sendEmail = function () {
            authServices.sendEmailReset($scope.form)
                .success(function () {
                    // broadcast message to target scope
                    $rootScope.$broadcast(AUTH_EVENTS.loginMessage, {
                        infomessage: 'Спасибо за регистрацию! Email с подробными инструкциями был выслан вам на почту'
                    });
                    $state.go('sign-in');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                })
        };

        $scope.reset = function () {
            authServices.reset($scope.form, $stateParams.token)
                .success(function (response) {
                    if(response.email == null) {
                        console.log($scope.form);
                        $scope.form.errors = { message: "23123123" };
                        //$rootScope.$broadcast(AUTH_EVENTS.loginMessage, { message: "lul" } )
                    } else {
                        $state.go('sign-in');
                    }
                })
                .error(function (response) {
                    //console.log(response)
                    $scope.form.errors = response;
                    if (response['password'])
                        $scope.form.errors['message'] = response['password.password1'];
                })
        };

        $scope.change = function () {
            authServices.change($scope.form)
                .success(function () {
                    $state.go('homepage');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                    if (response['password'])
                        $scope.form.errors['password.password2'] = response['password'];
                })
        };
    };
    PasswordCtrl.$inject = ['$scope', '$rootScope', 'authServices', '$state', '$stateParams', 'AUTH_EVENTS'];

    return {
        AuthCtrl: AuthCtrl,
        SignUpCtrl: SignUpCtrl,
        LoginCtrl: LoginCtrl,
        PasswordCtrl: PasswordCtrl
    };

});