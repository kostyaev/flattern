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

    mod.directive('pickerPlug', function($timeout) {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, element, attrs) {
                $timeout(function () {
                    $(element).picker(scope.$eval(attrs.pickerPlug))
                });
            }
        };
    });

    mod.directive('dropzone', function() {
        return function(scope, element, attrs) {
            element.dropzone({
                url: "/house/1/upload",
                maxFilesize: 5000,
                paramName: "uploadfile",
                maxThumbnailFilesize: 5,
                dictDefaultMessage: "Загрузите фотографии вашего жилья"
            });
        }
    });

    return mod;
});
