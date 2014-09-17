/**
 * Common functionality.
 */
define(['angular', './services/helper', './services/playRoutes', './filters',
        './directives/custom', './directives/otherPlugins','./directives/amdPlugins'],
    function(angular) {
        'use strict';

        return angular.module('flattern.common', [
            'common.helper', 'common.playRoutes', 'common.filters',
            'custom', 'otherPlugins','amdPlugins']);
    });
