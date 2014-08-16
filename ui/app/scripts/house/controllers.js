/**
 * User controllers.
 */
define(['angular', 'jquery', 'dropzone'], function(angular, $, Dropzone) {
    'use strict';

    var LeftCtrl = function ($scope) {

    };

    var GeneralCtrl = function ($scope, houseService) {

        $scope.houseTypes = ['Квартира', 'Дом', 'Общежитие'];
        $scope.rentTypes = ['Жилье целиком', 'Комната', 'Общая комната'];
        $scope.house = {houseType: $scope.houseTypes[1], rentType: $scope.rentTypes[1], price: 500};

        $scope.save = function(generalInfo) {
            houseService.saveGeneral(generalInfo);
        }

    };

    var AddressCtrl = function ($scope, $http, helper) {
        $scope.clear = function() {
            $scope.person.selected = undefined;
            $scope.address.selected = undefined;
            $scope.country.selected = undefined;
        };

        $scope.address = {};
        $scope.refreshAddresses = function(address) {
            var params = {address: address, sensor: false};
            return $http.get(
                'http://maps.googleapis.com/maps/api/geocode/json',
                {params: params}
            ).then(function(response) {
                    $scope.addresses = response.data.results
                });
        };

        $scope.country = {};
        $scope.countries = helper.getCountries();

    };


    var AmenCtrl = function ($scope) {


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
    GeneralCtrl.$inject = ['$scope', 'houseService'];
    AddressCtrl.$inject = ['$scope', '$http', 'helper'];
    AmenCtrl.$inject = ['$scope'];
    PhotosCtrl.$inject = ['$scope'];

    return {
        LeftCtrl: LeftCtrl,
        GeneralCtrl: GeneralCtrl,
        AddressCtrl: AddressCtrl,
        AmenCtrl: AmenCtrl,
        PhotosCtrl: PhotosCtrl
    };

});
