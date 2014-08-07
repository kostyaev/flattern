/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('flattern.home', ['ui.router', 'home.routes']);
    mod.controller("MainCtrl", controllers.MainCtrl);
    return mod;
});
