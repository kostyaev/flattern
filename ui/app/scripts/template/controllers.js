/**
 * User controllers.
 */
define(['angular', 'jquery'], function(angular, $) {
    'use strict';


    var ContentCtrl = function ($scope, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('template');
        $translate.refresh();
    };


    ContentCtrl.$inject = ['$scope', '$translate', '$translatePartialLoader'];

    return {
        ContentCtrl: ContentCtrl

    };

});
