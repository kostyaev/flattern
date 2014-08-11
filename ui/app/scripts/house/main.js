/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';
    return angular.module('flattern.house', ['ui.router', 'house.routes']);

});
