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

    mod.directive('dropzone', function($stateParams) {
        return function(scope, element, attrs) {
            element.dropzone({
                url: '/house/' + $stateParams.id + '/upload',
                maxFilesize: 15000,
                paramName: "photo",
                maxThumbnailFilesize: 10,
                dictDefaultMessage: "Загрузите фотографии вашего жилья"
            });
        }
    });

    mod.directive('ngGalleria', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div class="galleria" style="height: 600px; width: 100%">' +
                '<a href="{{img.image}}" ng-repeat="img in source.images">' +
                '<img src="{{img.thumb}}">' +
                '</a>' +
                '</div>',
            scope: {
                source: '='
            },
            link: function (scope, element, attrs) {
                var obj = element.find('.galleria');
                Galleria.loadTheme('../../../styles/plugins/galleria/themes/folio/galleria.folio.js');
                $timeout(function () {
                    var match = _.findWhere(scope.source.images, { image: scope.source.index.image });
                    var index = _.indexOf(scope.source.images, match);
                    Galleria.run(obj, {
                        show: index
                    });
                });
            }
        };
    });



    mod.directive('formAutofillFix', function ($timeout) {
        return function (scope, element, attrs) {
            element.prop('method', 'post');
            if (attrs.ngSubmit) {
                $timeout(function () {
                    element
                        .unbind('submit')
                        .bind('submit', function (event) {
                            event.preventDefault();
                            element
                                .find('input, textarea, select')
                                .trigger('input')
                                .trigger('change')
                                .trigger('keydown');
                            scope.$apply(attrs.ngSubmit);
                        });
                });
            }
        };
    });

    return mod;
});
