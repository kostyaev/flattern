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

        $scope.images = [
            {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/300/400/"},
            {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/300/400/sports"},
            {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/300/400/nightlife"},
            {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/300/400/"},
            {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/300/400/sports"},
            {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/300/400/nightlife"},
            {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/300/400/"},
            {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/300/400/sports"},
            {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/300/400/nightlife"}
        ];


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
        console.log("edit ctrl")
        houseService.getHouse($stateParams.id).success(function (house) {
            $scope.house = house;
            console.log("house is: ");
            console.log(house);
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

    var PhotosCtrl = function ($scope, $stateParams, $upload) {
        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: '/upload', //upload.php script, node.js route, or servlet url
                    //method: 'POST' or 'PUT',
                    //headers: {'header-key': 'header-value'},
                    //withCredentials: true,
                    data: {myObj: $scope.myModelObj},
                    file: file // or list of files ($files) for html5 only
                    //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                    // customize file formData name ('Content-Disposition'), server side file variable name.
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
                    // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                    //formDataAppender: function(formData, key, val){}
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    console.log(data);
                });
                //.error(...)
                //.then(success, error, progress);
                // access or attach event listeners to the underlying XMLHttpRequest.
                //.xhr(function(xhr){xhr.upload.addEventListener(...)})
            }
            /* alternative way of uploading, send the file binary with the file's content-type.
             Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
             It could also be used to monitor the progress of a normal http post/put request with large data*/
            // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
        };



    };

    HouseCtrl.$inject = ['$scope', 'houseService', '$translate', '$translatePartialLoader'];
    CreateCtrl.$inject = ['$scope', 'houseService', 'filterFilter'];
    EditCtrl.$inject = ['$scope', 'houseService', '$stateParams'];
    ContentCtrl.$inject = ['$scope', 'houseService', '$translate', '$translatePartialLoader'];
    GeneralCtrl.$inject = ['$scope', '$stateParams', 'houseService', '$state'];
    AddressCtrl.$inject = ['$scope', '$stateParams', 'helper', '$translate', 'houseService', 'filterFilter'];
    DescCtrl.$inject = ['$scope', '$stateParams', 'houseService'];
    AmenitiesCtrl.$inject = ['$scope', '$stateParams', 'houseService', 'filterFilter'];
    PhotosCtrl.$inject = ['$scope', '$stateParams', '$upload'];

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
