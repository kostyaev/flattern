define(["angular"], function(angular) {
    var mod = angular.module("common.directives.template", []);
    mod.directive("customInit", function () {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                console.log("custom init");


            }
        };
    });

    return mod;
});