define(['angular', 'template', 'about', 'general', 'i18n']/*deps*/, function (angular)/*invoke*/ {
  'use strict';

  return angular
    .module('app',
      ['flattern.template',
       'flattern.about',
       'flattern.general',
       'flattern.i18n'
  ]);
});
