define(['angular', 'home', 'about', 'general', 'i18n', 'auth', 'house']/*deps*/, function (angular)/*invoke*/ {
  'use strict';

  return angular
    .module('app',
      ['flattern.home',
       'flattern.about',
       'flattern.general',
       'flattern.i18n',
       'flattern.auth',
       'flattern.house'
  ]);
});
