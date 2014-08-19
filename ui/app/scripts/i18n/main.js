/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular'], function(angular) {
    'use strict';
    var mod = angular.module('flattern.i18n', ['pascalprecht.translate']);
    mod.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });

        //$translateProvider.preferredLanguage('ru');
        $translateProvider.determinePreferredLanguage();
    }]);
    return mod;
});
