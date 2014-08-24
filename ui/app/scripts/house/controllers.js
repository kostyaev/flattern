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

    var DescCtrl = function ($scope, $stateParams, houseService) {
        houseService.getDesc($stateParams.id).success(function (desc) {
            $scope.desc = desc;
        });

        $scope.save = function(desc) {
            houseService.saveDesc($stateParams.id, desc).success(function(response) {

            });
        }

    };

    var AmenitiesCtrl = function ($scope, $stateParams, houseService, filterFilter) {
        houseService.getAmenities($stateParams.id)
            .success(function (data) {
                $scope.amenities = $scope.constants.amenities.map(function(amenity) {
                    var selected = data.selectedAmenities.indexOf(amenity) > -1;
                    return {name: amenity, selected: selected}
                });
                $scope.generalAmenities = $scope.amenities.slice(0,11);
                $scope.otherAmenities = $scope.amenities.slice(11,20);
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
            var amenities = {};
            amenities.selectedAmenities = $scope.selection.map(function(amenity) {
                return amenity.name;
            });
            houseService.saveAmenities($stateParams.id, amenities);
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
    DescCtrl.$inject = ['$scope', '$stateParams', 'houseService'];
    AmenitiesCtrl.$inject = ['$scope', '$stateParams', 'houseService', 'filterFilter'];
    PhotosCtrl.$inject = ['$scope', '$stateParams'];

    return {
        LeftCtrl: LeftCtrl,
        ContentCtrl: ContentCtrl,
        CreateCtrl: CreateCtrl,
        GeneralCtrl: GeneralCtrl,
        AddressCtrl: AddressCtrl,
        DescCtrl: DescCtrl,
        AmenitiesCtrl: AmenitiesCtrl,
        PhotosCtrl: PhotosCtrl
    };

});
