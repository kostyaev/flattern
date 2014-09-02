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
        homeService.getHouses().success(function (page) {
            $scope.housePage = page;
        });
    };

        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                    ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i=0; i<4; i++) {
            $scope.addSlide();
        }

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
