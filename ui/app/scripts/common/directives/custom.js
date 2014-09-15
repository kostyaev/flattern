define(['angular',  '../services/helper'], function(angular) {
    var mod = angular.module('custom', ['common.helper']);
    var $ = angular.element;

    var setNavigationPosition = function () {
        console.log("called from from global init function");
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

    var equalHeight = function(container) {
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function() {
            $el = $(this);
            console.log($el);
            $($el).height('auto');
            topPostion = $el.position().top;
            console.log(topPosition);

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

    mod.run(function ($rootScope, $state ) {
        console.log("global init function");
        $(window).on('resize', function(){
            setNavigationPosition();
            setCarouselWidth();
            //equalHeight('.equal-height');
            centerSlider();
        });

        $(window).scroll(function () {
            var scrollAmount = $(window).scrollTop() / 1.5;
            scrollAmount = Math.round(scrollAmount);
            if ( $("#page-top").hasClass("navigation-fixed-bottom") ) {
                if ($(window).scrollTop() > $(window).height() - $('.navigation').height() ) {
                    $('.navigation').addClass('navigation-fix-to-top');
                } else {
                    $('.navigation').removeClass('navigation-fix-to-top');
                }
            }

            if ($(window).width() > 768) {
                if($('#map').hasClass('has-parallax')){
                    //$('#map .gm-style > div:first-child > div:first-child').css('margin-top', scrollAmount + 'px'); // old script
                    $('#map .gm-style').css('margin-top', scrollAmount + 'px');
                    $('#map .leaflet-map-pane').css('margin-top', scrollAmount + 'px');
                }
                if($('#slider').hasClass('has-parallax')){
                    $(".homepage-slider").css('top', scrollAmount + 'px');
                }
            }
        });
    });

    mod.directive('layoutExpandable', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw layout expandable");
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
            }
        }
    });


    mod.directive('bookmark', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("draw bookmarks");
                // Set Bookmark button attribute

                var bookmarkButton = el;

                if (bookmarkButton.data('bookmark-state') == 'empty') {
                    bookmarkButton.removeClass('bookmark-added');
                } else if (bookmarkButton.data('bookmark-state') == 'added') {
                    bookmarkButton.addClass('bookmark-added');
                }

                bookmarkButton.on("click", function() {
                    if (bookmarkButton.data('bookmark-state') == 'empty') {
                        bookmarkButton.data('bookmark-state', 'added');
                        bookmarkButton.addClass('bookmark-added');
                    } else if (bookmarkButton.data('bookmark-state') == 'added') {
                        bookmarkButton.data('bookmark-state', 'empty');
                        bookmarkButton.removeClass('bookmark-added');
                    }
                });
            }
        }
    });


    mod.directive('page', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                var $ = angular.element;
                console.log("draw page");

                //equalHeight('.equal-height');

                $('.nav > li > ul li > ul').css('left', $('.nav > li > ul').width());

                var navigationLi = $('.nav > li');
                navigationLi.hover(function() {
                    if (el.hasClass('navigation-fixed-bottom')){
                        if ($(window).width() > 768) {
                            var spaceUnderNavigation = $(window).height() - ($(this).offset().top - $(window).scrollTop());
                            if(spaceUnderNavigation < $(this).children('.child-navigation').height()){
                                $(this).children('.child-navigation').addClass('position-bottom');
                                console.log('smaller');
                            } else {
                                $(this).children('.child-navigation').removeClass('position-bottom');
                                console.log('bigger');
                            }
                        }
                    }
                });

                setNavigationPosition();

                if (el.hasClass('navigation-fixed-bottom')){
                    $('#page-content').css('padding-top',$('.navigation').height());
                }
            }
        }
    });

    mod.directive('footerThumbnails', function() {
        return {
            restrict: 'AE',
            link: function(scope, el, attrs) {
                console.log('activation thumbnails');
                var $ = angular.element;
                var i = 0;
                var rows = 1; // how many rows to display, default = 1
                var thumbnailsPerRow = 1; // how many thumbnails per row to display, default = 1

                $.getScript("/scripts/map/locations.js", function() {
                    // Create thumbnail function
                    function createThumbnail() {
                        for (i = 0; i < rows * thumbnailsPerRow; i++) {
                            el.append("<div class='property-thumbnail'><a href='" + locations[i][5] + "'><img src="  + locations[i][6] + "></a></div>");
                            var $thumbnail = el.find('.property-thumbnail');
                            $thumbnail.css('width', 100/thumbnailsPerRow + '%');
                        }
                    }

                    if ($(window).width() < 768) {
                        rows = 1;
                        thumbnailsPerRow = 5;
                        createThumbnail();
                    } else if ($(window).width() >= 768 && $(window).width() < 1199 ) {
                        rows = 1;
                        thumbnailsPerRow = 10;
                        createThumbnail();
                    } else if ($(window).width() >= 1200) {
                        rows = 1;
                        thumbnailsPerRow = 20;
                        createThumbnail();
                    }
                });
            }
        };
    });

    mod.directive('map', function(customMap) {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("activating map");
                var $ = angular.element;
                $('#map .marker-style').css('opacity', '.5 !important');
                $('#map .marker-style').css('background-color', 'red');
                var $content = $('content');
                if($content.hasClass('has-fullscreen-map')) {
                    el.height($(window).height() - $('.navigation').height());

                    $(window).on('resize', function() {
                        el.height($(window).height() - $('.navigation').height());
                        var mapHeight = $('#map').height();
                        var contentHeight = $('.search-box').height();
                        var top;
                        top = (mapHeight / 2) - (contentHeight / 2);
                        $('.search-box-wrapper').css('top', top);
                    });
                }
                if ($(window).width() < 768) {
                    el.height($(window).height() - $('.navigation').height());
                }

                _latitude = 48.87;
                _longitude = 2.29;
                customMap.createHomepageGoogleMap(_latitude,_longitude);
            }
        };
    });

    mod.directive('mapSubmit', function(customMap) {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log('mapSubmit');
                _latitude = 48.87;
                _longitude = 2.29;
                customMap.initSubmitMap(_latitude,_longitude);
            }
        };
    });

    mod.directive('mapPropertyDetail', function(customMap) {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log('mapPropertyDetail');
                customMap.initPropertyDetailMap();
            }
        };
    });

    mod.directive('mapContact', function (customMap) {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log('mapContact');
                _latitude = 48.87;
                _longitude = 2.29;
                customMap.contactUsMap(_latitude,_longitude);
            }
        }
    });


    mod.directive('centerSlider', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log('centerSlider');
                var $ = angular.element;
                if ($(window).width() < 979) {
                    var $navigation = $('.navigation');
                    $('#slider .slide').height($(window).height() - $navigation.height());
                    $('#slider').height($(window).height() - $navigation.height());

                }
                var imageWidth = $('#slider .slide img').width();
                var viewPortWidth = $(window).width();
                var centerImage = ( imageWidth/2 ) - ( viewPortWidth/2 );
                $('#slider .slide img').css('left', -centerImage);
            }
        }
    });

    mod.directive('agentState', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
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
            }
        }
    });

    mod.directive('centerSearchBox', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                var $ = angular.element;
                console.log("draw center search box");
                $('.search-box.map').addClass('show-search-box');
                var $searchBox = $('.search-box-wrapper');
                var $navigation = $('.navigation');
                var positionFromBottom = 20;
                if ($('div').hasClass('navigation-fixed-top')) {
                    $('#map, #slider').css('margin-top',$navigation.height());
                    $searchBox.css('z-index',98);
                } else {
                    $('.leaflet-map-pane').css('top',-50);
                    $(".homepage-slider").css('margin-top', -$('.navigation header').height());
                }
                if ($(window).width() > 768) {
                    $('#slider .slide .overlay').css('margin-bottom',$navigation.height());
                    $('#map, #slider').each(function () {
                        if (!$('content').hasClass('horizontal-search-float')) {
                            var mapHeight = $(this).height();
                            var contentHeight = $('.search-box').height();
                            var top;
                            if($('content').hasClass('has-fullscreen-map')) {
                                top = (mapHeight / 2) - (contentHeight / 2);
                            }
                            else {
                                top = (mapHeight / 2) - (contentHeight / 2) + $('.navigation').height();
                            }
                            $('.search-box-wrapper').css('top', top);
                        } else {
                            $searchBox.css('top', $(this).height() + $navigation.height() - $searchBox.height() - positionFromBottom);
                            $('#slider .slide .overlay').css('margin-bottom',$navigation.height() + $searchBox.height() + positionFromBottom);
                            if ($('content').hasClass('has-fullscreen-map')) {
                                $('.search-box-wrapper').css('top', $(this).height() - $('.navigation').height());
                            }
                        }
                    });
                }

            }
        }
    });

    mod.directive('autocomplete', function ($timeout) {
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

    mod.directive('disableAnimation', function($animate){
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs){
                $attrs.$observe('disableAnimation', function(value){
                    $animate.enabled(!value, $element);
                });
            }
        }
    });

    return mod;
});