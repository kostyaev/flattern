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
                        return {name: p, selected: selected}
                    } else {
                        return {name: p}
                    }
                });

                console.log($scope.user.privacy)
            })
            .error(function (data) {
                $state.go('registered.home.houses');
                //$location.path('/houses').replace();
            });

        //

        $scope.selection = [];

        // helper method to get selected amenities
        $scope.selectedPrivacy = function selectedPrivacy() {
            console.log(selection)
            return filterFilter($scope.user.privacy, { selected: true });
        };

        // watch amenities for changes
        $scope.$watch('privacy | filter:{selected:true}', function (data) {
            console.log(data)
            $scope.selection = data;
        }, true);

        $scope.save = function(generalInfo) {
            /*var privacy = {};
            privacy.selectedPrivacy = $scope.selection.map(function(p) {
                return p.name;
            });*/

            console.log(generalInfo)

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
