/** Helpers */
define(["angular"], function(angular) {
  var mod = angular.module("common.helper", []);
  mod.service("helper", function($http) {
    return {
      sayHi: function() {
        return "hi";
      },
      getCountries: function(lang) {
        return $http.get('i18n/countries/' + lang + '.json')
      }

    };
  });

  return mod;
});
