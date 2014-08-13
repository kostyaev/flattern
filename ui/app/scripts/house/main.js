/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers', './services'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('flattern.house', ['ui.router', 'house.routes', 'house.services']);
    mod.controller("GeneralCtrl", controllers.GeneralCtrl);
    return mod;

});
