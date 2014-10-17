/**
 * User controllers.
 */
define(['angular'], function(angular) {
    'use strict';

    var UserCtrl = function ($scope, userService, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('user');
        $translate.refresh();


    };

    var UserDetailsCtrl = function ($scope, userService, $stateParams) {
        console.log("here");
        console.log($stateParams.id);
        userService.getAccountUser($stateParams.id)
            .success(function(response) {
                console.log('getAccountUser');
                console.log(response);
                $scope.account = response.account;
                $scope.user    = response.user;
                $scope.houses  = response.houses;

            })
            .error(function (response) {
                console.log('error:getAccountUser');
                console.log(response);
            });
    };

    UserCtrl.$inject = ['$scope', 'userService', '$translate', '$translatePartialLoader'];

    UserDetailsCtrl.$inject = ['$scope', 'userService', '$stateParams'];


    return {
        UserCtrl: UserCtrl,
        UserDetailsCtrl: UserDetailsCtrl
    };

});
