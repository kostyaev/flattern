/**
 * User controllers.
 */
define(['angular'], function(angular) {
    'use strict';

    var UserCtrl = function ($scope, userService, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('user');
        $translate.refresh();
    };

    var PropertiesCtrl = function ($scope, userService) {
        userService.getProperties()
            .success(function(response) {
                $scope.properties = response;
            })
            .error(function (response) {
                console.log("can't get properties");
                console.log(response);
            });
    };

    UserCtrl.$inject = ['$scope', 'userService', '$translate', '$translatePartialLoader'];

    PropertiesCtrl.$inject = ['$scope', 'userService'];


    return {
        UserCtrl: UserCtrl,
        PropertiesCtrl: PropertiesCtrl
    };

});
