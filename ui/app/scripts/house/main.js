/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular', './routes', './controllers', './services'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('flattern.house', ['ui.router', 'ngSanitize', 'ui.select', 'house.routes', 'house.services']);
    mod.controller("GeneralCtrl", controllers.GeneralCtrl);

    mod.filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }
    });

    return mod;

});
