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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    mod.service('custom', function () {
        var $ = angular.element;

        var centerSlider = function () {
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

        var setMapHeight = function () {
            var $body = $('body');
            if($body.hasClass('has-fullscreen-map')) {
                $('#map').height($(window).height() - $('.navigation').height());

                $(window).on('resize', function() {
                    $('#map').height($(window).height() - $('.navigation').height());
                    var mapHeight = $('#map').height();
                    var contentHeight = $('.search-box').height();
                    var top;
                    top = (mapHeight / 2) - (contentHeight / 2);
                    $('.search-box-wrapper').css('top', top);
                });
            }
            if ($(window).width() < 768) {
                $('#map').height($(window).height() - $('.navigation').height());
            }
        };

        var setNavigationPosition = function () {
            $('.nav > li').each(function () {
                if($(this).hasClass('has-child')) {
                    var fullNavigationWidth = $(this).children('.child-navigation').width() + $(this).children('.child-navigation').children('li').children('.child-navigation').width();
                    if(($(this).children('.child-navigation').offset().left + fullNavigationWidth) > $(window).width()) {
                        $(this).children('.child-navigation').addClass('navigation-to-left');
                    }
                }
            })
        };

        var agentState = function () {
            var _originalHeight = $('#agency .form-group').height();
            var $agentSwitch = $('#agent-switch');
            var $agency = $('#agency');

            if ($agentSwitch.data('agent-state') == 'is-agent') {
                $agentSwitch.iCheck('check');
                $agency.removeClass('disabled');
                $agency.addClass('enabled');
                $agentSwitch.data('agent-state', '');
            } else {
                $agentSwitch.data('agent-state', 'is-agent');
                $agency.removeClass('enabled');
                $agency.addClass('disabled');
            }
        };

        var initCounter = function () {
            $('.number').countTo({
                speed: 3000,
                refreshInterval: 50
            });
        };

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

        var centerSearchBox = function () {
            var $searchBox = $('.search-box-wrapper');
            var $navigation = $('.navigation');
            var positionFromBottom = 20;
            if ($('body').hasClass('navigation-fixed-top')) {
                $('#map, #slider').css('margin-top',$navigation.height());
                $searchBox.css('z-index',98);
            } else {
                $('.leaflet-map-pane').css('top',-50);
                $(".homepage-slider").css('margin-top', -$('.navigation header').height());
            }
            if ($(window).width() > 768) {
                $('#slider .slide .overlay').css('margin-bottom',$navigation.height());
                $('#map, #slider').each(function () {
                    if (!$('body').hasClass('horizontal-search-float')) {
                        var mapHeight = $(this).height();
                        var contentHeight = $('.search-box').height();
                        var top;
                        if($('body').hasClass('has-fullscreen-map')) {
                            top = (mapHeight / 2) - (contentHeight / 2);
                        }
                        else {
                            top = (mapHeight / 2) - (contentHeight / 2) + $('.navigation').height();
                        }
                        $('.search-box-wrapper').css('top', top);
                    } else {
                        $searchBox.css('top', $(this).height() + $navigation.height() - $searchBox.height() - positionFromBottom);
                        $('#slider .slide .overlay').css('margin-bottom',$navigation.height() + $searchBox.height() + positionFromBottom);
                        if ($('body').hasClass('has-fullscreen-map')) {
                            $('.search-box-wrapper').css('top', $(this).height() - $('.navigation').height());
                        }
                    }
                });
            }
        };

        var setCarouselWidth = function () {
            $('.carousel-full-width').css('width', $(window).width());
        };

        var showRatingForm = function () {
            $('.rating-form').css('height', $('.rating-form form').height() + 85 + 'px');
        };

        var equalHeight = function (container) {

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

        // Disable click when dragging
        var disableClick = function () {
            $('.owl-carousel .property').css('pointer-events', 'none');
        };
        // Enable click after dragging
        var enableClick = function () {
            $('.owl-carousel .property').css('pointer-events', 'auto');
        };

        var sliderLoaded = function () {
            $('#slider').removeClass('loading');
            document.getElementById("loading-icon").remove();
            centerSlider();
        };

        var animateDescription = function () {
            var $description = $(".slide .overlay .info");
            $description.addClass('animate-description-out');
            $description.removeClass('animate-description-in');
            setTimeout(function() {
                $description.addClass('animate-description-in');
            }, 400);
        };

        var onStateChange = function () {

            //  Show Search Box on Map
            $('.search-box.map').addClass('show-search-box');

            //  Show All button

            this.showAllButton();

            //  Draw thumbnails in the footer

            //this.drawFooterThumbnails();

            //  Show counter after appear

            var $number = $('.number');
            if ($number.length > 0 ) {
                $number.waypoint(function() {
                    initCounter();
                }, { offset: '100%' });
            }

            agentState();

            //  Owl Carousel

            if ($('.owl-carousel').length > 0) {
                if ($('.carousel-full-width').length > 0) {
                    setCarouselWidth();
                }
                $(".featured-properties-carousel").owlCarousel({
                    items: 5,
                    itemsDesktop: [1700,4],
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
                    autoHeight : true,
                    navigation: true,
                    navigationText: ["",""],
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
                    transitionStyle : 'fade',
                    navigationText: ["",""],
                    afterInit: sliderLoaded,
                    afterAction: animateDescription,
                    startDragging: animateDescription
                });
            }
        };

        return {

            // Mobile Slider

            centerSlider: centerSlider,

            // Set height of the map

            setMapHeight: setMapHeight,

            setNavigationPosition: setNavigationPosition,

            // Agent state - Fired when user change the state if he is agent or doesn't

            agentState: agentState,

            initCounter: initCounter,

            showAllButton: showAllButton,

            //  Center Search box Vertically

            centerSearchBox: centerSearchBox,

            // Set Owl Carousel width

            setCarouselWidth: setCarouselWidth,

            // Show rating form

            showRatingForm: showRatingForm,

            //  Equal heights

            equalHeight: equalHeight,

            // former windows load
            onStateChange: onStateChange

        }
    });

    return mod;
});
