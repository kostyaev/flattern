define(['angular', 'home', 'about', 'general']/*deps*/, function (angular)/*invoke*/ {
  'use strict';

  return angular
    .module('app',
      ['flattern.home',
       'flattern.about',
       'flattern.general'
  ]);
});
