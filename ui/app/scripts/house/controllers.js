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

    var CreateCtrl = function (houseService) {
        console.log("create house");
        houseService.createHouse();
    };

    var GeneralCtrl = function ($scope, $stateParams, houseService, $state) {

        houseService.getGeneral($stateParams.id)
            .success(function (data) {
                console.log(data);
                console.log("data");
                $scope.house = data;
            })
            .error(function (data) {
                $state.go('registered.home.houses');
                //$location.path('/houses').replace();
            });

        houseService.getConstants()
            .success(function (data) {
                console.log(data);
                $scope.constants = data;
            });

        $scope.save = function(generalInfo) {
            houseService.saveGeneral($stateParams.id, generalInfo);
        }

    };

    var AddressCtrl = function ($scope, $stateParams, helper, $translate, houseService, filterFilter) {
        $scope.country = {};
        houseService.getAddress($stateParams.id).success(function (address) {
            $scope.addresss = address;
            var lang = $translate.use();
            helper.getCountries(lang).success(function (data) {
                $scope.countries = data.countries;
                $scope.country.selected = filterFilter($scope.countries, { code: address.country })[0];
                console.log($scope.country.selected);

            });
        });

    };


    var AmenitiesCtrl = function ($scope, $stateParams, houseService, filterFilter) {
        houseService.getAmenities($stateParams.id)
            .success(function (data) {
                $scope.generalAmenities = data.allAmenities.slice(0,10);
                $scope.otherAmenities = data.allAmenities.slice(10,30);
                $scope.selection = data.selectedAmenities;
            });

        // toggle selection for a given amenity by name
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

        $scope.save = function() {
            houseService.saveAmenities($scope.selection);
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
