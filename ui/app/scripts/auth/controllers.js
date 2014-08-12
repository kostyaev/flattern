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

    var SignUpCtrl = function ($scope, authService, $state, $stateParams) {
        $scope.form = $scope.form || {}
        $scope.sendEmail = function () {
            authService.sendEmail($scope.form)
                .success(function () {
                    $scope.form.errors.infomessage =
                        'Спасибо за регистрацию! Email с подробными инструкциями был выслан вам на почту';

                    $state.go('login');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                })
        };

        $scope.signUp = function () {
            console.log($scope.form)
            authService.signUp($scope.form, $stateParams.token)
                .success(function () {
                    $state.go('login');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                    if (response['password'])
                        $scope.form.errors['password.password2'] = response['password'];
                });
        };
    };
    SignUpCtrl.$inject = ['$scope', 'authService', '$state', '$stateParams'];

    var LoginCtrl = function ($scope, authService, $state) {
        $scope.form = $scope.form || {}
        $scope.login = function () {
            console.log($scope.form)
            authService.login($scope.form)
                .success(function () {
                    $state.go('registered.home.houses');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                });
        };

        $scope.logout = function () {
            authService.logout()
                .success(function () {
                    $state.go('login');
                })
                .error(function (response) {
                    $state.go('login');
                })
        }
    };
    LoginCtrl.$inject = ['$scope', 'authService', '$state'];

    var PasswordCtrl = function ($scope, authService, $state, $stateParams) {
        $scope.form = $scope.form || {}
        $scope.sendEmail = function () {
            console.log($scope.form)
            authService.sendEmailReset($scope.form)
                .success(function () {
                    $state.go('login');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                })
        };

        $scope.reset = function () {
            authService.reset($scope.form, $stateParams.token)
                .success(function () {
                    $state.go('login');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                    if (response['password'])
                        $scope.form.errors['password.password2'] = response['password'];
                })
        };

        $scope.change = function () {
            console.log($scope.form)
            authService.change($scope.form)
                .success(function () {
                    $state.go('registered.home.houses');
                })
                .error(function (response) {
                    $scope.form.errors = response;
                    if (response['password'])
                        $scope.form.errors['password.password2'] = response['password'];
                })
        };
    };
    PasswordCtrl.$inject = ['$scope', 'authService', '$state', '$stateParams'];

    return {
        AuthCtrl: AuthCtrl,
        SignUpCtrl: SignUpCtrl,
        LoginCtrl: LoginCtrl,
        PasswordCtrl: PasswordCtrl
    };

});
