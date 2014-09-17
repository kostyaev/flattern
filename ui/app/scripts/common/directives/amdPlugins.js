/**
 * A common directive.
 * It would also be ok to put all directives into one file, or to define one RequireJS module
 * that references them all.
 */
define(['angular', 'imagesloaded', 'masonry', 'bridget'], function(angular, imagesLoaded, Masonry, bridget) {
    var mod = angular.module("amdPlugins", []);

    mod.directive('masonry', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw masonry");
                var container = el;
                $.bridget( 'masonry', Masonry );

                imagesLoaded(container, function() {
                    container.masonry({
                        gutter: 15,
                        itemSelector: '.masonry'
                    });
                });
                if ($(window).width() > 991) {
                    $('.masonry').hover(function() {
                            $('.masonry').each(function () {
                                $('.masonry').addClass('masonry-hide-other');
                                $(this).removeClass('masonry-show');
                            });
                            $(this).addClass('masonry-show');
                        }, function() {
                            $('.masonry').each(function () {
                                $('.masonry').removeClass('masonry-hide-other');
                            });
                        }
                    );

                    var config = {
                        after: '0s',
                        enter: 'bottom',
                        move: '20px',
                        over: '.5s',
                        easing: 'ease-out',
                        viewportFactor: 0.33,
                        reset: false,
                        init: true
                    };
                    $(window).scrollReveal = new scrollReveal(config);
                }
            }
        }
    });


    return mod;
});
