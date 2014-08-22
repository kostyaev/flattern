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

        $scope.isGeneral = function(item) {
                return item.id < 20;
        };

        $scope.notGeneral = function(item) {
            return item.id > 20;
        };

        houseService.getAmenities($stateParams.id)
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
