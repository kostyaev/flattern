/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers', './services'], function(angular, routes, controllers) {
  'use strict';

  var mod = angular.module('flattern.auth', ['ui.router', 'auth.routes', 'auth.services']);
  mod.controller("AuthCtrl", controllers.AuthCtrl);
  mod.controller("LoginCtrl", controllers.LoginCtrl);
  mod.controller("SignUpCtrl", controllers.SignUpCtrl);
  mod.controller("PasswordCtrl", controllers.PasswordCtrl);
  return mod;
});
