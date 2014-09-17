/*jshint unused: vars */
require.config({
    packages: ['common', 'home', 'user', 'house', 'company', 'template', 'general', 'i18n'],
    paths: {
        'angular': '../components/angular/angular',
        'angular-route': '../components/angular-route/angular-route',
        'angular-cookies': '../components/angular-cookies/angular-cookies',
        'angular-sanitize': '../components/angular-sanitize/angular-sanitize',
        'angular-resource': '../components/angular-resource/angular-resource',
        'angular-animate': '../components/angular-animate/angular-animate',
        'angular-touch': '../components/angular-touch/angular-touch',
        'angular-mocks': '../components/angular-mocks/angular-mocks',
        'angular-translate': '../components/angular-translate/angular-translate',
        'angular-translate-partial' : '../components/angular-translate-loader-partial/angular-translate-loader-partial',
        'uiRouter': '../components/angular-ui-router/release/angular-ui-router',
        'http-auth-interceptor': '../components/angular-http-auth/src/http-auth-interceptor',
        'ui-select': '../components/angular-ui-select/dist/select',
        'ui-templates': '../components/angular-bootstrap/ui-bootstrap-tpls',
        'jquery': '../components/jquery/dist/jquery',
        'bootstrap': '../components/bootstrap/dist/js/bootstrap',
        'bootstrap-select': '../components/bootstrap-select/dist/js/bootstrap-select',
        'jsRoutes': '../jsRoutes',
        'galleria': '../components/galleria/src/galleria',
        'underscore': '../components/underscore/underscore',
        'icheck': '../components/iCheck/icheck',
        'owl.carousel': '../components/owlcarousel/owl-carousel/owl.carousel',
        'markerwithlabel': '../components/easy-markerwithlabel/src/markerwithlabel',
        'google-infobox': '../components/google-infobox/google-infobox',
        'markerclusterer': '../components/gmaps-markerclusterer-plus/src/markerclusterer',
        'raf': '../components/raf.js/raf',
        'smoothscroll': '../components/smoothscroll/dist/smoothscroll',
        'googlemaps': '../components/googlemaps-amd/src/googlemaps',
        'async': '../components/requirejs-plugins/src/async',
        'slider': '../components/jslider/js/jquery.slider',
        'draggable': '../components/jslider/js/draggable-0.1',
        'dependClass': '../components/jslider/js/jquery.dependClass-0.1',
        'numberformatter': '../components/jslider/js/jquery.numberformatter-1.2.3',
        'hashtable': '../components/jslider/js/jshashtable-2.1_src',
        'tmpl': '../components/jslider/js/tmpl',
        'imagesloaded': '../components/imagesloaded/imagesloaded.pkgd',
        'masonry': '../components/masonry/dist/masonry.pkgd',
        'bridget': '../components/jquery-bridget/jquery.bridget',
        'scroll-reveal': '../components/scrollReveal.js/dist/scrollReveal',
        'jquery-raty': '../components/jquery-raty/lib/jquery.raty',
        'magnific-popup': '../components/magnific-popup/dist/jquery.magnific-popup',
        'fitvids': '../components/fitvids/jquery.fitvids',
        'angular-scroll': '../components/angular-scroll/angular-scroll'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-resource': ['angular'],
        'angular-animate': ['angular'],
        'angular-touch': ['angular'],
        'angular-mocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'angular-translate' : ['angular'],
        'angular-translate-partial' : ['angular-translate'],
        'uiRouter': ['angular'],
        'http-auth-interceptor': ['angular'],
        'ui-select': ['angular'],
        'ui-templates' : ['angular'],
        'bootstrap': ['jquery'],
        'bootstrap-select': ['jquery'],
        'jsRoutes': {
            deps: [],
            // it's not a RequireJS module, so we have to tell it what var is returned
            exports: 'jsRoutes'
        },
        'galleria' : ['jquery'],
        'underscore' : [],
        'icheck': ['jquery'],
        'owl.carousel': ['jquery'],
        'markerwithlabel' : ['googlemaps!'],
        'google-infobox' : ['googlemaps!'],
        'markerclusterer' : [],
        'raf' : [],
        'smoothscroll': ['raf'],
        'slider': ['jquery', 'draggable', 'dependClass',
            'numberformatter', 'tmpl'],
        'draggable' : ['jquery'],
        'dependClass' : ['jquery'],
        'numberformatter' : ['jquery', 'hashtable'],
        'hashtable' : ['jquery'],
        'tmpl' : ['jquery'],
        'jquery-raty' : ['jquery'],
        'scroll-reveal': [],
        'magnific-popup': ['jquery'],
        'fitvids': ['jquery'],
        'angular-scroll': ['angular']
    },
    priority: [
        'angular'
    ],
    googlemaps: {
        url: 'https://maps.googleapis.com/maps/api/js',
        params: {
            libraries: 'places'
        }
    }
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
        'angular',
        'app',
        'angular-cookies',
        'angular-sanitize',
        'angular-resource',
        'angular-animate',
        'angular-touch',
        'angular-translate',
        'angular-translate-partial',
        'uiRouter',
        'http-auth-interceptor',
        'ui-select',
        'ui-templates',
        'jquery',
        'bootstrap',
        'bootstrap-select',
        'jsRoutes',
        'galleria',
        'underscore',
        'icheck',
        'owl.carousel',
        'markerwithlabel',
        'google-infobox',
        'markerclusterer',
        'raf' ,
        'smoothscroll',
        'slider',
        'googlemaps',
        'imagesloaded',
        'masonry',
        'bridget',
        'scroll-reveal',
        'jquery-raty',
        'magnific-popup',
        'fitvids',
        'angular-scroll'
    ],
    function(angular, app, ngCookies, ngSanitize, ngResource, ngAnimate, ngTouch) {
        'use strict';
        /* jshint ignore:start */
        var $html = angular.element(document.getElementsByTagName('html')[0]);
        /* jshint ignore:end */
        angular.element().ready(function() {
            angular.resumeBootstrap([app.name]);
        });
    });