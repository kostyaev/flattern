/**
 * User controllers.
 */
define(['angular', 'jquery'], function(angular, $) {
    'use strict';

    var HouseCtrl = function ($scope, houseService, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('house');
        $translate.refresh();

        console.log("translate");
        $scope.getConstants = houseService.getConstants()
            .then(function(response) {
                console.log("constants received");
                console.log(response);
                $scope.constants = response.data;
                return response.data;
            });


    };

    var CreateCtrl = function ($scope, houseService) {
        $scope.house = {id: 0, accountId: 1};

        console.log("create controller activated");
        $scope.getConstants.then(function(constants) {
            console.log(constants);
            $scope.amenities = constants.amenities.map(function(amenity) {
                return {name: amenity, selected: false}
            });

            console.log($scope.amenities);
        });

        $scope.selection = [];

        $scope.$watch('amenities | filter:{selected:true}', function (data) {
            $scope.selection = data;
        }, true);


        $scope.saveHouse = function() {
            $scope.house.amenities = $scope.selection.map(function(amenity) {
                return amenity.name;
            });
            console.log($scope.house);
            houseService.saveHouse($scope.house)
                .success(function(response) {
                    console.log("HOUSE IS SAVED");
                })
                .error(function (response) {
                    console.log(response);
                });
        };


    };

    var EditCtrl = function ($scope, houseService, $stateParams) {
        houseService.getHouse($stateParams.id).success(function (house) {
            $scope.house = house;
            $scope.getConstants.then(function(constants) {
                $scope.amenities = constants.amenities.map(function (amenity) {
                    var selected = $scope.house.amenities.indexOf(amenity) > -1;
                    return {name: amenity, selected: selected}
                });
                $scope.selection = [];
                // watch amenities for changes
                $scope.$watch('amenities | filter:{selected:true}', function (data) {
                    $scope.selection = data;
                }, true);
            });
        });

        $scope.save = function() {
            $scope.house.amenities = $scope.selection.map(function(amenity) {
                return amenity.name;
            });
            console.log($scope.house);
            houseService.saveHouse($scope.house)
                .success(function(response) {
                    console.log("HOUSE IS UPDATED");
                })
                .error(function (response) {
                    console.log(response);
                });
        }


    };

    var ContentCtrl = function ($scope, houseService, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('house');
        $translate.refresh();

        houseService.getConstants().success(function (data) {
            $scope.constants = data;
        });

    };


    var GeneralCtrl = function ($scope, $stateParams, houseService, $state) {
        houseService.getGeneral($stateParams.id)
            .success(function (data) {
                $scope.house = data;
            })
            .error(function (data) {
                //$state.go('registered.home.houses');
                $state.transitionTo('registered.home.houses');
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
        $scope.images = {
            images:[
                {
                    image : "../../../images/houses/thumbnails/1.jpg",      // Image url
                    thumb : "../../../images/houses/thumbnails/1.jpg"       // Thumb url
                },
                {
                    image : "../../../images/houses/thumbnails/2.jpg",      // Image url
                    thumb : "../../../images/houses/thumbnails/2.jpg"       // Thumb url
                },
                {
                    image : "../../../images/houses/thumbnails/3.jpg",      // Image url
                    thumb : "../../../images/houses/thumbnails/3.jpg"       // Thumb url
                }

            ],
            index : {     // Selected image object when loaded
                image : "../../../images/houses/thumbnails/1.jpg",      // Image url
                thumb : "../../../images/houses/thumbnails/1.jpg"       // Thumb url
            }
        }
    };

    HouseCtrl.$inject = ['$scope', 'houseService', '$translate', '$translatePartialLoader'];
    CreateCtrl.$inject = ['$scope', 'houseService', 'filterFilter'];
    EditCtrl.$inject = ['$scope', 'houseService', '$stateParams'];
    ContentCtrl.$inject = ['$scope', 'houseService', '$translate', '$translatePartialLoader'];
    GeneralCtrl.$inject = ['$scope', '$stateParams', 'houseService', '$state'];
    AddressCtrl.$inject = ['$scope', '$stateParams', 'helper', '$translate', 'houseService', 'filterFilter'];
    DescCtrl.$inject = ['$scope', '$stateParams', 'houseService'];
    AmenitiesCtrl.$inject = ['$scope', '$stateParams', 'houseService', 'filterFilter'];
    PhotosCtrl.$inject = ['$scope', '$stateParams'];

    return {
        HouseCtrl: HouseCtrl,
        CreateCtrl: CreateCtrl,
        EditCtrl: EditCtrl,
        ContentCtrl: ContentCtrl,
        GeneralCtrl: GeneralCtrl,
        AddressCtrl: AddressCtrl,
        DescCtrl: DescCtrl,
        AmenitiesCtrl: AmenitiesCtrl,
        PhotosCtrl: PhotosCtrl
    };

});
