/**
 * User controllers.
 */
define(['angular', 'jquery'], function(angular, $) {
    'use strict';

    var LeftCtrl = function ($scope) {

    };

    var ContentCtrl = function ($scope, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('home');
        $translate.refresh();
    };

    LeftCtrl.$inject = ['$scope'];
    ContentCtrl.$inject = ['$scope', '$translate', '$translatePartialLoader'];

    return {
        LeftCtrl: LeftCtrl,
        ContentCtrl: ContentCtrl
    };

});
