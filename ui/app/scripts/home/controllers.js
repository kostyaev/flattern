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


    var HousesCtrl = function ($scope, homeService) {
        console.log(homeService);
        homeService.getHouses().success(function (page) {
            $scope.housePage = page;
            console.log(page);
        });
    };

    var UsersCtrl = function ($scope, homeService) {
        homeService.getUsers(1).success(function (page) {
            $scope.userPage = page;
            console.log(page);
        });
    };


    LeftCtrl.$inject = ['$scope'];
    ContentCtrl.$inject = ['$scope', '$translate', '$translatePartialLoader'];
    HousesCtrl.$inject = ['$scope', 'homeService'];
    UsersCtrl.$inject = ['$scope', 'homeService'];

    return {
        LeftCtrl: LeftCtrl,
        ContentCtrl: ContentCtrl,
        HousesCtrl: HousesCtrl,
        UsersCtrl: UsersCtrl
    };

});
