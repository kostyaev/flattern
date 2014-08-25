/**
 * User controllers.
 */
define(['angular', 'jquery'], function(angular, $) {
    'use strict';

    var LeftCtrl = function ($scope) {

    };

    var ContentCtrl = function ($scope, userService, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('user');
        $translate.refresh();
    };

    var GeneralCtrl = function ($scope, $stateParams, userService, $state) {
        userService.getGeneral()
            .success(function (data) {
                console.log("user data");
                $scope.user = data;
            })
            .error(function (data) {
                $state.go('registered.home.houses');
                //$location.path('/houses').replace();
            });

        userService.getConstants()
            .success(function (data) {
                console.log('user constants')
                console.log(data);
                $scope.constants = data;
            });

        $scope.save = function(generalInfo) {
            userService.saveGeneral(generalInfo);
        }

    };

    var AboutCtrl = function ($scope, $stateParams, userService, $state) {
        userService.getAbout()
            .success(function (data) {
                console.log(data);
                console.log("user data");
                $scope.user = data;
            })
            .error(function (data) {
                $state.go('registered.home.houses');
                //$location.path('/houses').replace();
            });

        userService.getConstants()
            .success(function (data) {
                console.log('user constants')
                console.log(data);
                $scope.constants = data;
            });

        $scope.save = function(generalInfo) {
            userService.saveAbout(generalInfo);
        }

    };

    LeftCtrl.$inject = ['$scope'];
    ContentCtrl.$inject = ['$scope', 'userService', '$translate', '$translatePartialLoader'];
    GeneralCtrl.$inject = ['$scope', '$stateParams', 'userService', '$state'];
    AboutCtrl.$inject = ['$scope', '$stateParams', 'userService', '$state'];

    return {
        LeftCtrl: LeftCtrl,
        ContentCtrl: ContentCtrl,
        GeneralCtrl: GeneralCtrl,
        AboutCtrl: AboutCtrl
    };

});
