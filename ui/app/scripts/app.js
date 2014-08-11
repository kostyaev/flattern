define(['angular', 'home', 'about', 'general', 'translations', 'auth', 'house']/*deps*/, function (angular)/*invoke*/ {
  'use strict';

  return angular
    .module('app',
      ['flattern.home',
       'flattern.about',
       'flattern.general',
       'flattern.translations',
       'flattern.auth',
       'flattern.house'
  ]);
});
