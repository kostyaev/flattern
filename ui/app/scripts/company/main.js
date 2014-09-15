/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './services'], function(angular, routes) {
    'use strict';

    var mod = angular.module('flattern.company', ['ui.router', 'company.routes', 'company.services']);
    return mod;
});
