/**
 * User controllers.
 */
define(['angular'], function(angular) {
    'use strict';


    var HeaderCtrl = function ($scope, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('general');
        $translate.refresh();
    };

    var FooterCtrl = function ($scope) {

    };

    HeaderCtrl .$inject = ['$scope', '$translate', '$translatePartialLoader'];
    FooterCtrl.$inject = ['$scope'];

    return {
        HeaderCtrl : HeaderCtrl,
        FooterCtrl: FooterCtrl
    };

});
