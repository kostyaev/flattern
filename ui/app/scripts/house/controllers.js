/**
 * User controllers.
 */
define(['angular', 'jquery', 'dropzone'], function(angular, $, Dropzone) {
    'use strict';

    var LeftCtrl = function ($scope) {
        $scope.$on('$viewContentLoaded', function(){
            $("select").selecter();
            $("input[type=checkbox], input[type=radio]").picker();
        });


    };

    var AmenCtrl = function ($scope) {


    };

    var PhotosCtrl = function ($scope) {
        $scope.$on('$viewContentLoaded', function(){
            console.log("init dropzone");
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
    AmenCtrl.$inject = ['$scope'];
    PhotosCtrl.$inject = ['$scope'];

    return {
        LeftCtrl: LeftCtrl,
        AmenCtrl: AmenCtrl,
        PhotosCtrl: PhotosCtrl
    };

});
