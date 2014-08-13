/**
 * Auth service.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('auth.services', ['flattern.common']);
    mod.factory('authService', ['$http', function ($http) {

        return {
            sendEmail: function (form) {
                return $http.post('signup', form);
            },
            signUp: function (form, token) {
                return $http.post('signup/' + token, form);
            },
            login: function (form) {
                return $http.post('authenticate/userpass', form);
            },
            logout: function () {
                return $http.get('logout');
            },
            sendEmailReset: function (form) {
                return $http.post('password/reset', form);
            },
            reset: function (form, token) {
                return $http.post('password/reset/' + token, form);
            },
            change: function (form) {
                return $http.post('password/change', form);
            }
        };
    }]);

    return mod;
});