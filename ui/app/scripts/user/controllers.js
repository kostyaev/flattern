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

        userService.getConstants()
            .success(function (data) {
                console.log('user constants')
                console.log(data);
                $scope.constants = data;
            });

        userService.getGeneral()
            .success(function (data) {
                console.log("user data");
                $scope.user = data;
            })
            .error(function (data) {
                $state.go('registered.home.houses');
                //$location.path('/houses').replace();
            });

        $scope.save = function(generalInfo) {
            userService.saveGeneral(generalInfo);
        };

    };

    var AboutCtrl = function ($scope, $stateParams, userService, $state, filterFilter) {

        userService.getConstants()
            .success(function (data) {
                console.log('user constants')
                console.log(data);
                $scope.constants = data;
            });


        userService.getAbout()
            .success(function (data) {
                console.log(data);
                console.log("user data");
                $scope.user = data;

                $scope.user.privacy = $scope.constants.privacy.map(function(p) {
                    if(typeof data.privacy !== 'undefined') {
                        var selected = data.privacy.indexOf(p) > -1;
                        return { name: p, selected: selected };
                    } else {
                        return { name: p, selected: false };
                    }
                });

                console.log($scope.user.privacy)
            })
            .error(function (data) {
                $state.go('registered.home.houses');
                //$location.path('/houses').replace();
            });

        $scope.toggleSelection = function toggleSelection(p) {
            var idx = $scope.user.privacy.map(function(e) { return e.name; }).indexOf(p);

            // is currently selected
            if (idx > -1) {
                if(typeof $scope.user.privacy[idx].name !== 'undefined'){
                    if(!$scope.user.privacy[idx].selected)
                        $scope.user.privacy[idx].selected = true;
                    else
                        $scope.user.privacy[idx].selected = false;
                }
            }
            console.log($scope.user.privacy);
        };

        $scope.save = function(generalInfo) {
            generalInfo.privacy = $scope.clone($scope.user.privacy).filter(function(e) { return (e.selected === true); }).map(function(e) { return e.name; });
            console.log(generalInfo);
            console.log($scope.user.privacy);

            userService.saveAbout(generalInfo);
        }

    };

    LeftCtrl.$inject = ['$scope'];
    ContentCtrl.$inject = ['$scope', 'userService', '$translate', '$translatePartialLoader'];
    GeneralCtrl.$inject = ['$scope', '$stateParams', 'userService', '$state'];
    AboutCtrl.$inject = ['$scope', '$stateParams', 'userService', '$state', 'filterFilter'];

    return {
        LeftCtrl: LeftCtrl,
        ContentCtrl: ContentCtrl,
        GeneralCtrl: GeneralCtrl,
        AboutCtrl: AboutCtrl
    };

});
