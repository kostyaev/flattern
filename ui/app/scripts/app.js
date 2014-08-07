define(['angular', 'home', 'about', 'templates']/*deps*/, function (angular)/*invoke*/ {
  'use strict';

  return angular
    .module('app',
      ['flattern.home',
       'flattern.about',
       'flattern.templates'
  ]);
//    .config(function ($routeProvider) {
//      $routeProvider
//        .when('/', {
//          templateUrl: 'views/main.html',
//          controller: 'MainCtrl'
//        })
//        .when('/about', {
//          templateUrl: 'views/about.html',
//          controller: 'AboutCtrl'
//        })
//        .otherwise({
//          redirectTo: '/'
//        });
//    });
});
