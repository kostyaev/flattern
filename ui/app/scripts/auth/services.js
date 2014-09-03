/**
 * Auth service.
 */
define(['angular', 'common'], function (angular) {
    'use strict';

    var mod = angular.module('auth.services', ['flattern.common']);
    mod.factory('authServices', ['$http', 'Session', function ($http, Session) {

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
            },
            checkAuth: function (options) {
                var opt = options || {};
                var method = opt.method || 'get';
                var url    = opt.url || 'login/check';

                switch(method) {
                    case 'get': return $http.get(url); break;
                    case 'post': return $http.get(url); break;
                    default: return $http.get(url); break;
                }
            },
            isAuthenticated: function () {
                return !!Session.session.userId;
            },
            isAuthorized: function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (/*!!Session.session.userId && */authorizedRoles.indexOf(Session.session.userRole) !== -1);
            },
            currentUserRole: function () {
                return Session.session.userRole;
            }
        };


    }]);

    mod.service('Session', function () {
        this.session = { id: '', fullName: '', userRole: '', avatarUrl: '' };
        var outer = this;

        this.create = function (id, fullName, userRole, avatarUrl) {
            outer.session.id = id;
            outer.session.fullName = fullName;
            outer.session.userRole = userRole;
            outer.session.avatrURL = avatarUrl;

            return outer.session;
        };
        this.destroy = function () {
            outer.session.id = null;
            outer.session.fullName = null;
            outer.session.userRole = null;
            outer.session.avatrURL = null;

            return outer.session;
        };
        return this;
    });

    return mod;
});