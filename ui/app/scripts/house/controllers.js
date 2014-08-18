/**
 * User controllers.
 */
define(['angular', 'jquery'], function(angular, $) {
    'use strict';

    var LeftCtrl = function ($scope) {

    };

    var ContentCtrl = function ($scope, houseService) {

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

    var AddressCtrl = function ($scope, helper) {
        $scope.country = {};
        $scope.countries = helper.getCountries();

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
                console.log(data);
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
            console.log($scope.selection);
        }
    };

    var PhotosCtrl = function ($scope) {
//        $scope.$on('$viewContentLoaded', function(){
//            var myAwesomeDropzone = new Dropzone("#my-awesome-dropzone", {
//                url: "/file/post",
//                init: function() {
//                    this.on("addedfile", function(file) {
//                        console.log("added file!!");
//                    });
//                    this.on("success", function(file) {
//                        console.log("successfully uploaded file");
//                    });
//                }
//            });
//
//        });

        $scope.image = null;
        $scope.imageFileName = ''


    };

    LeftCtrl.$inject = ['$scope'];
    ContentCtrl.$inject = ['$scope', 'houseService'];
    GeneralCtrl.$inject = ['$scope', 'houseService'];
    AddressCtrl.$inject = ['$scope', 'helper'];
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
