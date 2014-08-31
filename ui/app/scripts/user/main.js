/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers', './services'], function(angular, routes) {
    'use strict';

    var mod = angular.module('flattern.user', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ui.select', 'user.routes', 'user.services']);

    mod.directive('errSrc', function() {
        return {
            link: function(scope, element, attrs) {

                scope.$watch(function() {
                    return attrs['ngSrc'];
                }, function (value) {
                    if (!value) {
                        element.attr('src', attrs.errSrc);
                    }
                });

                element.bind('error', function() {
                    element.attr('src', attrs.errSrc);
                });
            }
        }
    });

    return mod;

});
