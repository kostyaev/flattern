/*jshint unused: vars */
require.config({
    packages: ['common', 'about', 'home', 'general', 'translations', 'auth', 'house'],
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
        'jquery': '../components/jquery/dist/jquery',
        'bootstrap': '../components/bootstrap/dist/js/bootstrap',
        //template dependencies
        'sco.ajax': '../components/sco.js/js/sco.ajax',
        'sco.collapse': '../components/sco.js/js/sco.collapse',
        'sco.confirm': '../components/sco.js/js/sco.confirm',
        'sco.countdown': '../components/sco.js/js/sco.countdown',
        'sco.message': '../components/sco.js/js/sco.message',
        'sco.modal': '../components/sco.js/js/sco.modal',
        'select2': '../components/select2/select2',
        'dropzone': '../components/dropzone/downloads/dropzone-amd-module',
        'bootbox': '../components/bootbox/bootbox',
        'bootstrap-datepicker': '../components/bootstrap-datepicker/js/bootstrap-datepicker',
        'bootstrap-touchspin': '../components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin',
        'picker': '../components/Picker/jquery.fs.picker',
        'scroller': '../components/Scroller/jquery.fs.scroller',
        'selecter': '../components/Selecter/jquery.fs.selecter',
        'uiRouter': '../components/angular-ui-router/release/angular-ui-router',
        'jsRoutes': '../jsRoutes',
        'ui-select': '../components/angular-ui-select/dist/select',
        'ui-bootstrap': '../components/angular-bootstrap/ui-bootstrap'

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
        'uiRouter': ['angular'],
        'bootstrap': ['jquery'],
        'bootstrap-datepicker': ['jquery', 'bootstrap'],
        'select2': ['jquery'],
        'bootstrap-touchspin': ['jquery', 'bootstrap'],
        'bootbox': ['bootstrap'],
        'picker': ['jquery'],
        'selecter': ['jquery'],
        'scroller': ['jquery'],
        'jsRoutes': {
            deps: [],
            // it's not a RequireJS module, so we have to tell it what var is returned
            exports: 'jsRoutes'
        },
        'sco.ajax' : ['jquery'],
        'sco.collapse' : ['jquery'],
        'sco.confirm' : ['jquery'],
        'sco.countdown' : ['jquery'],
        'sco.message' : ['jquery'],
        'sco.modal' : ['jquery'],
        'ui-select': ['angular'],
        'ui-bootstrap' : ['angular']
    },
    priority: [
        'angular'
    ]
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
        'uiRouter',
        'jquery',
        //'bootstrap',
        'jsRoutes',
        'sco.ajax',
        'sco.collapse',
        'sco.confirm',
        'sco.countdown',
        'sco.message',
        'sco.modal',
        'select2',
        'dropzone',
        'bootbox',
        'bootstrap-datepicker',
        'bootstrap-touchspin',
        'picker',
        'selecter',
        'scroller',
        'ui-select',
        'ui-bootstrap'
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
