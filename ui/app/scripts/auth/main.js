/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
  'use strict';

  var mod = angular.module('flattern.auth', ['ui.router', 'auth.routes']);
  mod.controller("AuthCtrl", controllers.AuthCtrl);
  return mod;
});
