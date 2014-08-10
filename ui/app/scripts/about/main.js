/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers', './services'], function(angular, routes, controllers) {
  'use strict';

  var mod = angular.module('flattern.about', ['ui.router', 'about.routes', 'about.services']);
  mod.controller("AboutCtrl", controllers.AboutCtrl);
  return mod;
});
