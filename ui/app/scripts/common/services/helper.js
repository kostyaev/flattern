/** Helpers */
define(['angular'], function(angular) {
    var mod = angular.module('common.helper', []);
    mod.service('helper', function($http) {
        return {
            sayHi: function() {
                return 'hi';
            },
            getCountries: function(lang) {
                return $http.get('i18n/countries/' + lang + '.json')
            }

        };
    });

    mod.service('custom', function () {
        var $ = angular.element;

        var showAllButton = function () {
            var rowsToShow = 2; // number of collapsed rows to show
            var $layoutExpandable = $('.layout-expandable');
            var layoutHeightOriginal = $layoutExpandable.height();
            $layoutExpandable.height($('.layout-expandable .row').height()*rowsToShow-5);
            $('.show-all').on("click", function() {
                if ($layoutExpandable.hasClass('layout-expanded')) {
                    $layoutExpandable.height($('.layout-expandable .row').height()*rowsToShow-5);
                    $layoutExpandable.removeClass('layout-expanded');
                    $('.show-all').removeClass('layout-expanded');
                } else {
                    $layoutExpandable.height(layoutHeightOriginal);
                    $layoutExpandable.addClass('layout-expanded');
                    $('.show-all').addClass('layout-expanded');
                }
            });

        };

        var initCounter = function () {
            $('.number').countTo({
                speed: 3000,
                refreshInterval: 50
            });
        };

        var setNavigationPosition = function () {
            $('.nav > li').each(function () {
                if($(this).hasClass('has-child')){
                    var fullNavigationWidth = $(this).children('.child-navigation').width() + $(this).children('.child-navigation').children('li').children('.child-navigation').width();
                    if(($(this).children('.child-navigation').offset().left + fullNavigationWidth) > $(window).width()){
                        $(this).children('.child-navigation').addClass('navigation-to-left');
                    }
                }
            });
        };

        var setCarouselWidth = function () {
            $('.carousel-full-width').css('width', $(window).width());
        };

        var equalHeight = function(container) {

            var currentTallest = 0,
                currentRowStart = 0,
                rowDivs = new Array(),
                $el,
                topPosition = 0;
            $(container).each(function() {

                $el = $(this);
                $($el).height('auto');
                topPostion = $el.position().top;

                if (currentRowStart != topPostion) {
                    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPostion;
                    currentTallest = $el.height();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                }
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
            });
        };

        var centerSlider = function() {
            if ($(window).width() < 979) {
                var $navigation = $('.navigation');
                $('#slider .slide').height($(window).height() - $navigation.height());
                $('#slider').height($(window).height() - $navigation.height());

            }
            var imageWidth = $('#slider .slide img').width();
            var viewPortWidth = $(window).width();
            var centerImage = ( imageWidth/2 ) - ( viewPortWidth/2 );
            $('#slider .slide img').css('left', -centerImage);
        };

        var onStateChange = function () {
            this.showAllButton();

            var $number = $('.number');
            if ($number.length > 0 ) {
                $number.waypoint(function() {
                    this.initCounter();
                }, { offset: '100%' });
            }

            $(window).on('resize', function(){
                this.setNavigationPosition();
                this.setCarouselWidth();
                this.equalHeight('.equal-height');
                this.centerSlider();
            });

        };

        return {
            initCounter: initCounter,
            showAllButton: showAllButton,
            setNavigationPosition: setNavigationPosition,
            setCarouselWidth: setCarouselWidth,
            equalHeight: equalHeight,
            centerSlider: centerSlider,
            // former windows load
            onStateChange: onStateChange

        }
    });

    return mod;
});
