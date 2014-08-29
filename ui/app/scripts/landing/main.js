/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers', './services'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('flattern.landing', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ui.select', 'landing.routes', 'landing.services']);
    mod.controller("LandingCtrl", controllers.LandingCtrl);

    return mod;

});
