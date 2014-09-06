define(['angular', '../services/helper'], function(angular) {
    var mod = angular.module('common.directives.template', ['common.helper']);
    var $ = angular.element;
    mod.directive('customInit', function (custom) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var $ = element;
                console.log('customInit');

                //  Equal heights

                function equalHeight(container) {

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
                }

                function setNavigationPosition(){
                    $('.nav > li').each(function () {
                        if($(this).hasClass('has-child')){
                            var fullNavigationWidth = $(this).children('.child-navigation').width() + $(this).children('.child-navigation').children('li').children('.child-navigation').width();
                            if(($(this).children('.child-navigation').offset().left + fullNavigationWidth) > $(window).width()){
                                $(this).children('.child-navigation').addClass('navigation-to-left');
                            }
                        }
                    });
                }

                function setCarouselWidth(){
                    $('.carousel-full-width').css('width', $(window).width());
                }

                equalHeight('.equal-height');

                $('.nav > li > ul li > ul').css('left', $('.nav > li > ul').width());

                var navigationLi = $('.nav > li');
                navigationLi.hover(function() {
                    if ($('content').hasClass('navigation-fixed-bottom')){
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

                $('.tool-tip').tooltip();

                var select = $('select');
                if (select.length > 0 ){
                    select.selectpicker();
                }

                var bootstrapSelect = $('.bootstrap-select');
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

                select.change(function() {
                    if ($(this).val() != '') {
                        $('.form-search .bootstrap-select.open').addClass('selected-option-check');
                    }else {
                        $('.form-search  .bootstrap-select.open').removeClass('selected-option-check');
                    }
                });

                //  Contact form

                $("#form-contact-submit").bind("click", function(event){
                    $("#form-contact").validate({
                        submitHandler: function() {
                            $.post("assets/php/contact.php", $("#form-contact").serialize(),  function(response) {
                                $('#form-status').html(response);
                                $('#form-contact-submit').attr('disabled','true');
                            });
                            return false;
                        }
                    });
                });

                //  Fit videos width and height

                if($('.video').length > 0) {
                    $('.video').fitVids();
                }

                //  Price slider

                var $priceSlider = $("#price-input");
                if($priceSlider.length > 0) {
                    $priceSlider.slider({
                        from: 1000,
                        to: 299000,
                        step: 1000,
                        round: 1,
                        format: { format: '$ ###,###', locale: 'en' }
                    });
                }

                //  Parallax scrolling and fixed header after scroll

                $('#map .marker-style').css('opacity', '.5 !important');
                $('#map .marker-style').css('bakground-color', 'red');

                $(window).scroll(function () {
                    var scrollAmount = $(window).scrollTop() / 1.5;
                    scrollAmount = Math.round(scrollAmount);
                    if ( $('body').hasClass('navigation-fixed-bottom') ) {
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

                //  Smooth Navigation Scrolling

                $('.navigation .nav a[href^="#"], a[href^="#"].roll').on('click',function (e) {
                    e.preventDefault();
                    var target = this.hash,
                        $target = $(target);
                    if ($(window).width() > 768) {
                        $('html, content').stop().animate({
                            'scrollTop': $target.offset().top - $('.navigation').height()
                        }, 2000)
                    } else {
                        $('html, content').stop().animate({
                            'scrollTop': $target.offset().top
                        }, 2000)
                    }
                });

                //  Rating

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

                //  Agent State

                $('#agent-switch').on('ifClicked', function(event) {
                    agentState();
                });

                $('#create-account-user').on('ifClicked', function(event) {
                    $('#agent-switch').data('agent-state', '');
                    agentState();
                });

                // Set Bookmark button attribute

                var bookmarkButton = $(".bookmark");

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

                if ($('content').hasClass('navigation-fixed-bottom')){
                    $('#page-content').css('padding-top',$('.navigation').height());
                }

                //  Masonry grid listing

                if($('.property').hasClass('masonry')){
                    var container = $('.grid');
                    container.imagesLoaded( function() {
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
                        window.scrollReveal = new scrollReveal(config);
                    }
                }

                //  Magnific Popup

                var imagePopup = $('.image-popup');
                if (imagePopup.length > 0) {
                    imagePopup.magnificPopup({
                        type:'image',
                        removalDelay: 300,
                        mainClass: 'mfp-fade',
                        overflowY: 'scroll'
                    });
                }

                //  iCheck

                if ($('.checkbox').length > 0) {
                    $('input').iCheck();
                }

                if ($('.radio').length > 0) {
                    $('input').iCheck();
                }

                //  Pricing Tables in Submit page

                if($('.submit-pricing').length >0 ){
                    $('.btn').click(function() {
                            $('.submit-pricing .buttons td').each(function () {
                                $(this).removeClass('package-selected');
                            });
                            $(this).parent().css('opacity','1');
                            $(this).parent().addClass('package-selected');

                        }
                    );
                }

                centerSearchBox();



            }
        };
    });

    mod.run(function ($rootScope, $state, custom) {
        $rootScope.$on('$stateChangeSuccess', function () {
            console.log('$stateChangeSuccess');
            custom.onStateChange();
        });
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

    mod.directive('map', function() {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {
                console.log("activating map");
                var $ = angular.element;
                $('#map .marker-style').css('opacity', '.5 !important');
                $('#map .marker-style').css('bakground-color', 'red');
                $('.search-box.map').addClass('show-search-box');
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
            }
        };
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
                var $searchBox = $('.search-box-wrapper');
                var $navigation = $('.navigation');
                var positionFromBottom = 20;
                if ($('content').hasClass('navigation-fixed-top')) {
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

    mod.directive('owlCarousel', function() {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'AE',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, el, attrs) {

                function setCarouselWidth() {
                    $('.carousel-full-width').css('width', $(window).width());
                }

                // Disable click when dragging
                function disableClick(){
                    $('.owl-carousel .property').css('pointer-events', 'none');
                }
                // Enable click after dragging
                function enableClick(){
                    $('.owl-carousel .property').css('pointer-events', 'auto');
                }

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
                function sliderLoaded(){
                    $('#slider').removeClass('loading');
                    document.getElementById("loading-icon").remove();
                    centerSlider();
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

    return mod;
});