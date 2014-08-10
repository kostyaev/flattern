/**
 * User package module.
 * Manages all sub-modules so other RequireJS modules only have to import the package.
 */
define(['angular'], function(angular) {
    'use strict';
    var mod = angular.module('flattern.translations', ['pascalprecht.translate']);
    mod.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            'TITLE': 'Hello',
            'FOO': 'This is a paragraph'
        });

        $translateProvider.translations('de', {
            'TITLE': 'Hallo',
            'FOO': 'Dies ist ein Paragraph'
        });

        $translateProvider.translations('ru', {
            'TITLE': 'Привет',
            'FOO': 'Это параграф'
        });

        //$translateProvider.preferredLanguage('en');
        //$translateProvider.determinePreferredLanguage();
    }]);
    return mod;
});
