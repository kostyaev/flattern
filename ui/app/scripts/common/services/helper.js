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
            console.log("WARN!!!")

            $('.number').countTo({
                speed: 3000,
                refreshInterval: 50
            });
        };

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
            showAllButton();
            var $number = $('.number');
            if ($number.length > 0 ) {
                $number.waypoint(function() {
                    initCounter();
                }, { offset: '100%' });
            }

            $(window).on('resize', function(){
                setNavigationPosition();
                setCarouselWidth();
                equalHeight('.equal-height');
                centerSlider();
            });

        };


        return {
            initCounter: initCounter,
            showAllButton: showAllButton,
            setNavigationPosition: setNavigationPosition,
            setCarouselWidth: setCarouselWidth,
            centerSlider: centerSlider,
            // former windows load
            onStateChange: onStateChange

        }
    });


    mod.service('customMap', function () {
        var $ = angular.element;
        var mapStyles = [{featureType:'water',elementType:'all',stylers:[{hue:'#d7ebef'},{saturation:-5},{lightness:54},{visibility:'on'}]},{featureType:'landscape',elementType:'all',stylers:[{hue:'#eceae6'},{saturation:-49},{lightness:22},{visibility:'on'}]},{featureType:'poi.park',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-81},{lightness:34},{visibility:'on'}]},{featureType:'poi.medical',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-80},{lightness:-2},{visibility:'on'}]},{featureType:'poi.school',elementType:'all',stylers:[{hue:'#c8c6c3'},{saturation:-91},{lightness:-7},{visibility:'on'}]},{featureType:'landscape.natural',elementType:'all',stylers:[{hue:'#c8c6c3'},{saturation:-71},{lightness:-18},{visibility:'on'}]},{featureType:'road.highway',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-92},{lightness:60},{visibility:'on'}]},{featureType:'poi',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-81},{lightness:34},{visibility:'on'}]},{featureType:'road.arterial',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-92},{lightness:37},{visibility:'on'}]},{featureType:'transit',elementType:'geometry',stylers:[{hue:'#c8c6c3'},{saturation:4},{lightness:10},{visibility:'on'}]}];

        var initSubmitMap = function (_latitude,_longitude){
            var mapCenter = new google.maps.LatLng(_latitude,_longitude);
            var mapOptions = {
                zoom: 15,
                center: mapCenter,
                disableDefaultUI: false,
                //scrollwheel: false,
                styles: mapStyles
            };
            var mapElement = document.getElementById('submit-map');
            var map = new google.maps.Map(mapElement, mapOptions);
            var marker = new MarkerWithLabel({
                position: mapCenter,
                map: map,
                icon: '/images/marker.png',
                labelAnchor: new google.maps.Point(50, 0),
                draggable: true
            });
            $('#submit-map').removeClass('fade-map');
            google.maps.event.addListener(marker, "mouseup", function (event) {
                var latitude = this.position.lat();
                var longitude = this.position.lng();
                $('#latitude').val( this.position.lat() );
                $('#longitude').val( this.position.lng() );
            });

            // TODO: Autocomplete
            //var input = /** @type {HTMLInputElement} */( document.getElementById('address-map') );
            //var autocomplete = new google.maps.places.Autocomplete(input);
            //autocomplete.bindTo('bounds', map);
            /*google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                $('#latitude').val( marker.getPosition().lat() );
                $('#longitude').val( marker.getPosition().lng() );
                var address = '';
                *//*if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }*//*
            });*/

            //google.maps.event.addDomListener(window, 'load', initSubmitMap(_latitude,_longitude));

        };

        var initPropertyDetailMap = function () {
            var propertyId = 0;
            google.maps.event.addDomListener(window, 'load', initMap(propertyId));
        };

        function successSubmit(position) {
            initSubmitMap(position.coords.latitude, position.coords.longitude);
            $('#latitude').val( position.coords.latitude );
            $('#longitude').val( position.coords.longitude );
        }

        $('.geo-location').on("click", function() {
            if (navigator.geolocation) {
                $('#submit-map').addClass('fade-map');
                navigator.geolocation.getCurrentPosition(successSubmit);
            } else {
                error('Geo Location is not supported');
            }
        });

        ///

        var createHomepageGoogleMap = function(_latitude,_longitude){
            if( document.getElementById('map') != null ){
                $.getScript("/scripts/map/locations.js", function(){
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 14,
                        scrollwheel: false,
                        center: new google.maps.LatLng(_latitude, _longitude),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: mapStyles
                    });
                    var i;
                    var newMarkers = [];
                    for (i = 0; i < locations.length; i++) {
                        var pictureLabel = document.createElement("img");
                        pictureLabel.src = locations[i][7];
                        var boxText = document.createElement("div");
                        infoboxOptions = {
                            content: boxText,
                            disableAutoPan: false,
                            //maxWidth: 150,
                            pixelOffset: new google.maps.Size(-100, 0),
                            zIndex: null,
                            alignBottom: true,
                            boxClass: "infobox-wrapper",
                            enableEventPropagation: true,
                            closeBoxMargin: "0px 0px -8px 0px",
                            closeBoxURL: "/images/close-btn.png",
                            infoBoxClearance: new google.maps.Size(1, 1)
                        };
                        var marker = new MarkerWithLabel({
                            title: locations[i][0],
                            position: new google.maps.LatLng(locations[i][3], locations[i][4]),
                            map: map,
                            icon: '/images/marker.png',
                            labelContent: pictureLabel,
                            labelAnchor: new google.maps.Point(50, 0),
                            labelClass: "marker-style"
                        });
                        newMarkers.push(marker);
                        boxText.innerHTML =
                            '<div class="infobox-inner">' +
                            '<a href="' + locations[i][5] + '">' +
                            '<div class="infobox-image" style="position: relative">' +
                            '<img src="' + locations[i][6] + '">' + '<div><span class="infobox-price">' + locations[i][2] + '</span></div>' +
                            '</div>' +
                            '</a>' +
                            '<div class="infobox-description">' +
                            '<div class="infobox-title"><a href="'+ locations[i][5] +'">' + locations[i][0] + '</a></div>' +
                            '<div class="infobox-location">' + locations[i][1] + '</div>' +
                            '</div>' +
                            '</div>';
                        //Define the infobox
                        newMarkers[i].infobox = new InfoBox(infoboxOptions);
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                for (h = 0; h < newMarkers.length; h++) {
                                    newMarkers[h].infobox.close();
                                }
                                newMarkers[i].infobox.open(map, this);
                            }
                        })(marker, i));

                    }
                    var clusterStyles = [
                        {
                            url: '/images/cluster.png',
                            height: 37,
                            width: 37
                        }
                    ];
                    var markerCluster = new MarkerClusterer(map, newMarkers, {styles: clusterStyles, maxZoom: 15});
                    $('content').addClass('loaded');
                    setTimeout(function() {
                        $('content').removeClass('has-fullscreen-map');
                    }, 1000);
                    $('#map').removeClass('fade-map');

                    //  Dynamically show/hide markers --------------------------------------------------------------

                    google.maps.event.addListener(map, 'idle', function() {

                        for (var i=0; i < locations.length; i++) {
                            if ( map.getBounds().contains(newMarkers[i].getPosition()) ){
                                // newMarkers[i].setVisible(true); // <- Uncomment this line to use dynamic displaying of markers

                                //newMarkers[i].setMap(map);
                                //markerCluster.setMap(map);
                            } else {
                                // newMarkers[i].setVisible(false); // <- Uncomment this line to use dynamic displaying of markers

                                //newMarkers[i].setMap(null);
                                //markerCluster.setMap(null);
                            }
                        }
                    });

                    // Function which set marker to the user position
                    function success(position) {
                        var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        map.panTo(center);
                        $('#map').removeClass('fade-map');
                    }

                });
                // Enable Geo Location on button click
                $('.geo-location').on("click", function() {
                    if (navigator.geolocation) {
                        $('#map').addClass('fade-map');
                        navigator.geolocation.getCurrentPosition(success);
                    } else {
                        error('Geo Location is not supported');
                    }
                });
            }
        };

        var success = function(position) {
            createHomepageGoogleMap(position.coords.latitude, position.coords.longitude);
        };

        var initMap = function(propertyId) {
            $.getScript("/scripts/map/locations.js", function(){
                var subtractPosition = 0;
                var mapWrapper = $('#property-detail-map.float');

                if (document.documentElement.clientWidth > 1200) {
                    subtractPosition = 0.013;
                }
                if (document.documentElement.clientWidth < 1199) {
                    subtractPosition = 0.006;
                }
                if (document.documentElement.clientWidth < 979) {
                    subtractPosition = 0.001;
                }
                if (document.documentElement.clientWidth < 767) {
                    subtractPosition = 0;
                }

                var mapCenter = new google.maps.LatLng(locations[propertyId][3],locations[propertyId][4]);

                if ( $("#property-detail-map").hasClass("float") ) {
                    mapCenter = new google.maps.LatLng(locations[propertyId][3],locations[propertyId][4] - subtractPosition);
                    mapWrapper.css('width', mapWrapper.width() + mapWrapper.offset().left )
                }

                var mapOptions = {
                    zoom: 15,
                    center: mapCenter,
                    disableDefaultUI: false,
                    scrollwheel: false,
                    styles: mapStyles
                };
                var mapElement = document.getElementById('property-detail-map');
                var map = new google.maps.Map(mapElement, mapOptions);

                var pictureLabel = document.createElement("img");
                pictureLabel.src = locations[propertyId][7];
                var markerPosition = new google.maps.LatLng(locations[propertyId][3],locations[propertyId][4]);
                var marker = new MarkerWithLabel({
                    position: markerPosition,
                    map: map,
                    icon: '/images/marker.png',
                    labelContent: pictureLabel,
                    labelAnchor: new google.maps.Point(50, 0),
                    labelClass: "marker-style"
                });
            });
        };

        var contactUsMap = function(_latitude,_longitude) {
            var mapCenter = new google.maps.LatLng(_latitude,_longitude);
            var mapOptions = {
                zoom: 15,
                center: mapCenter,
                disableDefaultUI: false,
                scrollwheel: false,
                styles: mapStyles
            };
            var mapElement = document.getElementById('contact-map');
            var map = new google.maps.Map(mapElement, mapOptions);

            var marker = new MarkerWithLabel({
                position: mapCenter,
                map: map,
                icon: '/images/marker.png',
                //labelContent: pictureLabel,
                labelAnchor: new google.maps.Point(50, 0),
                labelClass: "marker-style"
            });
        };

        var createHomepageOSM = function(_latitude,_longitude){
            if( document.getElementById('map') != null ){
                $.getScript("assets/js/locations.js", function(){
                    var map = L.map('map', {
                        center: [_latitude,_longitude],
                        zoom: 14,
                        scrollWheelZoom: false
                    });
                    L.tileLayer('http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}', {
                        //L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                        //subdomains: '0123',
                        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                    }).addTo(map);
                    var markers = L.markerClusterGroup({
                        showCoverageOnHover: false
                    });
                    for (var i = 0; i < locations.length; i++) {
                        var _icon = L.divIcon({
                            html: '<img src="' + locations[i][7] +'">',
                            iconSize:     [40, 48],
                            iconAnchor:   [20, 48],
                            popupAnchor:  [0, -48]
                        });
                        var title = locations[i][0];
                        var marker = L.marker(new L.LatLng(locations[i][3],locations[i][4]), {
                            title: title,
                            icon: _icon
                        });
                        marker.bindPopup(
                                '<div class="property">' +
                                '<a href="' + locations[i][5] + '">' +
                                '<div class="property-image">' +
                                '<img src="' + locations[i][6] + '">' +
                                '</div>' +
                                '<div class="overlay">' +
                                '<div class="info">' +
                                '<div class="tag price"> ' + locations[i][2] + '</div>' +
                                '<h3>' + locations[i][0] + '</h3>' +
                                '<figure>' + locations[i][1] + '</figure>' +
                                '</div>' +
                                '</div>' +
                                '</a>' +
                                '</div>'
                        );
                        markers.addLayer(marker);
                    }

                    map.addLayer(markers);
                    map.on('locationfound', onLocationFound);

                    function locateUser() {
                        $('#map').addClass('fade-map');
                        map.locate({setView : true})
                    }

                    function onLocationFound(){
                        $('#map').removeClass('fade-map');
                    }

                    $('.geo-location').on("click", function() {
                        locateUser();
                    });

                    $('content').addClass('loaded');
                    setTimeout(function() {
                        $('content').removeClass('has-fullscreen-map');
                    }, 1000);
                    $('#map').removeClass('fade-map');
                });

            }
        };

        return {
            createHomepageGoogleMap: createHomepageGoogleMap,
            success: success,
            initMap: initMap,
            contactUsMap: contactUsMap,
            createHomepageOSM: createHomepageOSM,
            initSubmitMap: initSubmitMap,
            initPropertyDetailMap: initPropertyDetailMap
        }
    });

    return mod;
});
