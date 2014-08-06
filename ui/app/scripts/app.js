define(['angular', 'home', 'about']/*deps*/, function (angular)/*invoke*/ {
  'use strict';

  return angular
    .module('app',
      ['flattern.home',
       'flattern.about'
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
