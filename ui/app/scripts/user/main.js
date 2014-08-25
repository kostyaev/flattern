/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers', './services'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('flattern.user', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ui.select', 'user.routes', 'user.services']);
    mod.controller("EditCtrl", controllers.EditCtrl);

    return mod;

});
