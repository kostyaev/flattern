/**
 * User controllers.
 */
define(['angular', 'jquery'], function(angular, $) {
    'use strict';

    var LeftCtrl = function ($scope) {

    };

    var ContentCtrl = function ($scope, houseService, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('house');
        $translate.refresh();
    };

    var GeneralCtrl = function ($scope, houseService) {
        houseService.getGeneral()
            .success(function (data) {
                $scope.house = data;
            });

        houseService.getConstants()
            .success(function (data) {
                $scope.constants = data;
            });

        $scope.save = function(generalInfo) {
            houseService.saveGeneral(generalInfo);
        }

    };

    var AddressCtrl = function ($scope, helper, $translate, houseService, filterFilter) {
        $scope.country = {};
        houseService.getAddress().success(function (address) {
            $scope.addresss = address;
            var lang = $translate.use();
            helper.getCountries(lang).success(function (data) {
                $scope.countries = data.countries;
                $scope.country.selected = filterFilter($scope.countries, { code: address.country })[0];
                console.log($scope.country.selected);

            });
        });

    };


    var AmenitiesCtrl = function ($scope, houseService, filterFilter) {

        $scope.isGeneral = function(item) {
                return item.id < 20;
        };

        $scope.notGeneral = function(item) {
            return item.id > 20;
        };

        houseService.getAmenities()
            .success(function (data) {
                $scope.amenities = data;
            });

        $scope.selection = [];

        // helper method to get selected amenities
        $scope.selectedAmenities = function selectedAmenities() {
            return filterFilter($scope.amenities, { selected: true });
        };

        // watch amenities for changes
        $scope.$watch('amenities | filter:{selected:true}', function (data) {
            $scope.selection = data;
        }, true);

        $scope.save = function() {
            houseService.saveAmenities($scope.selection);
        }
    };

    var PhotosCtrl = function ($scope) {
        $scope.image = null;
        $scope.imageFileName = ''


    };

    LeftCtrl.$inject = ['$scope'];
    ContentCtrl.$inject = ['$scope', 'houseService', '$translate', '$translatePartialLoader'];
    GeneralCtrl.$inject = ['$scope', 'houseService'];
    AddressCtrl.$inject = ['$scope', 'helper', '$translate', 'houseService', 'filterFilter'];
    AmenitiesCtrl.$inject = ['$scope', 'houseService', 'filterFilter'];
    PhotosCtrl.$inject = ['$scope'];

    return {
        LeftCtrl: LeftCtrl,
        ContentCtrl: ContentCtrl,
        GeneralCtrl: GeneralCtrl,
        AddressCtrl: AddressCtrl,
        AmenitiesCtrl: AmenitiesCtrl,
        PhotosCtrl: PhotosCtrl
    };

});
