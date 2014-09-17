/**
 * A common directive.
 * It would also be ok to put all directives into one file, or to define one RequireJS module
 * that references them all.
 */
define(['angular'], function(angular) {
    var mod = angular.module("otherPlugins", []);

    mod.directive('bootstrapSelect', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw bootstrapSelect");

                var bootstrapSelect = el;
                var dropDownMenu = $('.dropdown-menu');

                bootstrapSelect.on('shown.bs.dropdown', function () {
                    dropDownMenu.removeClass('animation-fade-out');
                    dropDownMenu.addClass('animation-fade-in');
                });

                bootstrapSelect.on('hide.bs.dropdown', function () {
                    dropDownMenu.removeClass('animation-fade-in');
                    dropDownMenu.addClass('animation-fade-out');
                });

                bootstrapSelect.on('hidden.bs.dropdown', function () {
                    var _this = $(this);
                    $(_this).addClass('open');
                    setTimeout(function() {
                        $(_this).removeClass('open');
                    }, 100);
                });

            }
        }
    });

    mod.directive('toolTip', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw tooltip");
                el.tooltip();
            }
        }
    });

    mod.directive('video', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw video");
                //  Fit videos width and height
                el.fitVids();
            }
        }
    });

    mod.directive('imagePopup', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw image-popup");
                el.magnificPopup({
                    type:'image',
                    removalDelay: 300,
                    mainClass: 'mfp-fade',
                    overflowY: 'scroll'
                });

            }
        }
    });

    mod.directive('priceInput', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw price inputs");
                if(el.length > 0) {
                    el.slider({
                        from: 1000,
                        to: 299000,
                        step: 1000,
                        round: 1,
                        format: { format: '$ ###,###', locale: 'en' }
                    });
                }
            }
        }
    });

    mod.directive('select', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'E',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw selects");
                el.selectpicker();
                el.change(function() {
                    if ($(this).val() != '') {
                        $('.form-search .bootstrap-select.open').addClass('selected-option-check');
                    }else {
                        $('.form-search  .bootstrap-select.open').removeClass('selected-option-check');
                    }
                });
            }
        }
    });

    //FIXME
    mod.directive('input', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'E',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw checkboxes");
                el.iCheck();
            }
        }
    });

    mod.directive('owlCarousel', function($timeout, layoutHelper) {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw owl carousel");
                function setCarouselWidth() {
                    $('.carousel-full-width').css('width', $(window).width());
                }

                // Disable click when dragging
                function disableClick() {
                    $('.owl-carousel .property').css('pointer-events', 'none');
                }

                // Enable click after dragging
                function enableClick() {
                    $('.owl-carousel .property').css('pointer-events', 'auto');
                }

                $timeout(function () {
                    if ($('.owl-carousel').length > 0) {
                        if ($('.carousel-full-width').length > 0) {
                            setCarouselWidth();
                        }
                        $(".featured-properties-carousel").owlCarousel({
                            items: 5,
                            itemsDesktop: [1700, 4],
                            responsiveBaseWidth: ".featured-properties-carousel",
                            pagination: false,
                            startDragging: disableClick,
                            beforeMove: enableClick
                        });
                        $(".testimonials-carousel").owlCarousel({
                            items: 1,
                            responsiveBaseWidth: ".testimonial",
                            pagination: true
                        });
                        $(".property-carousel").owlCarousel({
                            items: 1,
                            responsiveBaseWidth: ".property-slide",
                            pagination: false,
                            autoHeight: true,
                            navigation: true,
                            navigationText: ["", ""],
                            startDragging: disableClick,
                            beforeMove: enableClick
                        });
                        $(".homepage-slider").owlCarousel({
                            autoPlay: 10000,
                            navigation: true,
                            mouseDrag: false,
                            items: 1,
                            responsiveBaseWidth: ".slide",
                            pagination: false,
                            transitionStyle: 'fade',
                            navigationText: ["", ""],
                            afterInit: sliderLoaded,
                            afterAction: animateDescription,
                            startDragging: animateDescription
                        });
                    }
                }, 500);

                function sliderLoaded(){
                    $('#slider').removeClass('loading');
                    document.getElementById("loading-icon").remove();
                    layoutHelper.centerSlider();
                }
                function animateDescription(){
                    var $description = $(".slide .overlay .info");
                    $description.addClass('animate-description-out');
                    $description.removeClass('animate-description-in');
                    setTimeout(function() {
                        $description.addClass('animate-description-in');
                    }, 400);
                }
            }
        }
    });

    mod.directive('propertyRating', function() {
        return {
            restrict: 'AE',
            link: function() {
                function showRatingForm(){
                    $('.rating-form').css('height', $('.rating-form form').height() + 85 + 'px');
                }

                var ratingOverall = $('.rating-overall');
                if (ratingOverall.length > 0) {
                    ratingOverall.raty({
                        path: '/images',
                        readOnly: true,
                        score: function() {
                            return $(this).attr('data-score');
                        }
                    });
                }
                var ratingIndividual = $('.rating-individual');
                if (ratingIndividual.length > 0) {
                    ratingIndividual.raty({
                        path: '/images',
                        readOnly: true,
                        score: function() {
                            return $(this).attr('data-score');
                        }
                    });
                }
                var ratingUser = $('.rating-user');
                if (ratingUser.length > 0) {
                    $('.rating-user .inner').raty({
                        path: '/images',
                        starOff : 'big-star-off.png',
                        starOn  : 'big-star-on.png',
                        width: 150,
                        //target : '#hint',
                        targetType : 'number',
                        targetFormat : 'Rating: {score}',
                        click: function(score, evt) {
                            showRatingForm();
                        }
                    });
                }
            }
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

    return mod;
});
