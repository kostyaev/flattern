/**
 * User controllers.
 */
define(['angular'], function(angular) {
    'use strict';


    var MainCtrl = function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    };

    var FooterCtrl = function ($scope) {

    };

    MainCtrl.$inject = ['$scope'];
    FooterCtrl.$inject = ['$scope'];

    return {
        MainCtrl: MainCtrl,
        FooterCtrl: FooterCtrl
    };

});
