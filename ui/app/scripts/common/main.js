/**
 * Common functionality.
 */
define(['angular', './services/helper', './services/playRoutes', './filters', './directives/example','./directives/template'],
  function(angular) {
      'use strict';

    return angular.module('flattern.common', ['common.helper', 'common.playRoutes', 'common.filters',
      'common.directives.example', 'common.directives.template']);
});
