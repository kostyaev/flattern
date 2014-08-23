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

        houseService.getConstants()
            .success(function (data) {
                $scope.constants = data;
                $scope.generalAmenities = data.amenities.slice(0,11);
                $scope.otherAmenities = data.amenities.slice(11,20);
            });
    };

    var CreateCtrl = function (houseService) {
        houseService.createHouse();
    };

    var GeneralCtrl = function ($scope, $stateParams, houseService, $state) {

        houseService.getGeneral($stateParams.id)
            .success(function (data) {
                $scope.house = data;
            })
            .error(function (data) {
                $state.go('registered.home.houses');
                //$location.path('/houses').replace();
            });

        $scope.save = function(generalInfo) {
            houseService.saveGeneral($stateParams.id, generalInfo);
        }

    };

    var AddressCtrl = function ($scope, $stateParams, helper, $translate, houseService, filterFilter) {
        $scope.country = {};

        houseService.getAddress($stateParams.id).success(function (address) {
            $scope.address = address;
            var lang = $translate.use();
            helper.getCountries(lang).success(function (data) {
                $scope.countries = data.countries;
                $scope.country.selected = filterFilter($scope.countries, { code: address.countryCode })[0];
            });
        });

        $scope.save = function(address) {
            address.countryCode = $scope.country.selected.code;
            houseService.saveAddress($stateParams.id, address).success(function(response) {

            });
        }

    };

    var AmenitiesCtrl = function ($scope, $stateParams, houseService, filterFilter) {
        houseService.getAmenities($stateParams.id)
            .success(function (data) {
                $scope.selection = data.selectedAmenities;
                console.log($scope.selection);

                $scope.toggleSelection = function toggleSelection(amenity) {
                    var idx = $scope.selection.indexOf(amenity);

                    // is currently selected
                    if (idx > -1) {
                        $scope.selection.splice(idx, 1);
                    }
                    // is newly selected
                    else {
                        $scope.selection.push(amenity);
                    }
                };

            });

        $scope.save = function() {
            houseService.saveAmenities($stateParams.id, $scope.selection);
        }
    };

    var PhotosCtrl = function ($scope, $stateParams) {
        $scope.image = null;
        $scope.imageFileName = ''


    };

    LeftCtrl.$inject = ['$scope'];
    ContentCtrl.$inject = ['$scope', 'houseService', '$translate', '$translatePartialLoader'];
    CreateCtrl.$inject = ['houseService'];
    GeneralCtrl.$inject = ['$scope', '$stateParams', 'houseService', '$state'];
    AddressCtrl.$inject = ['$scope', '$stateParams', 'helper', '$translate', 'houseService', 'filterFilter'];
    AmenitiesCtrl.$inject = ['$scope', '$stateParams', 'houseService', 'filterFilter'];
    PhotosCtrl.$inject = ['$scope', '$stateParams'];

    return {
        LeftCtrl: LeftCtrl,
        ContentCtrl: ContentCtrl,
        CreateCtrl: CreateCtrl,
        GeneralCtrl: GeneralCtrl,
        AddressCtrl: AddressCtrl,
        AmenitiesCtrl: AmenitiesCtrl,
        PhotosCtrl: PhotosCtrl
    };

});
