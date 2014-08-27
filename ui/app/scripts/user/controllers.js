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

        $scope.clone = function (obj) {
            var copy;

            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = $scope.clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = $scope.clone(obj[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        };

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
            var sendData = $scope.clone(generalInfo);
            sendData.privacy = $scope.user.privacy.filter(function(e) { return (e.selected === true); }).map(function(e) { return e.name; });
            console.log(sendData);

            userService.saveAbout(sendData);
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
