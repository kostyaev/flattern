/**
 * User controllers.
 */
define(['angular', 'jquery', 'dropzone'], function(angular, $, Dropzone) {
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


    var AmenitiesCtrl = function ($scope, houseService) {
        houseService.getAmenities()
            .success(function (data) {
                console.log(data);
                $scope.amenities = data;
            });
    };

    var PhotosCtrl = function ($scope) {
        $scope.$on('$viewContentLoaded', function(){
            var myAwesomeDropzone = new Dropzone("#my-awesome-dropzone", {
                url: "/file/post",
                init: function() {
                    this.on("addedfile", function(file) {
                        console.log("added file!!");
                    });
                    this.on("success", function(file) {
                        console.log("successfully uploaded file");
                    });
                }
            });

        });
    };

    LeftCtrl.$inject = ['$scope'];
    ContentCtrl.$inject = ['$scope', 'houseService'];
    GeneralCtrl.$inject = ['$scope', 'houseService'];
    AddressCtrl.$inject = ['$scope', 'helper'];
    AmenitiesCtrl.$inject = ['$scope', 'houseService'];
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
