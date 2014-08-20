/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular'], function(angular) {
    'use strict';
    var mod = angular.module('flattern.i18n', ['pascalprecht.translate']);
    mod.config(['$translateProvider', '$translatePartialLoaderProvider', function ($translateProvider, $translatePartialLoaderProvider) {

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '/i18n/{part}/{lang}.json'
        });
        $translatePartialLoaderProvider.addPart('global');

        //$translateProvider.preferredLanguage('ru');
        $translateProvider.determinePreferredLanguage();
    }]);
    return mod;
});
