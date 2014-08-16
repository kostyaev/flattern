/**
 * A common directive.
 * It would also be ok to put all directives into one file, or to define one RequireJS module
 * that references them all.
 */
define(["angular"], function(angular) {
    var mod = angular.module("common.directives.example", []);
    mod.directive("example", ["$log", function($log) {
        return {
            restrict: "AE",
            link: function(scope, el, attrs) {
                $log.info("Here prints the example directive from /common/directives.");
            }
        };
    }])

    mod.directive('selecterPlug', function() {
            return {
                // Restrict it to be an attribute in this case
                restrict: 'A',
                // responsible for registering DOM listeners as well as updating the DOM
                link: function(scope, element, attrs) {
                    $(element).selecter(scope.$eval(attrs.selecterPlug));
                }
            };
        });

    mod.directive('pickerPlug', function() {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, element, attrs) {
                $(element).picker(scope.$eval(attrs.selecterPlug));
            }
        };
    });

    return mod;
});
