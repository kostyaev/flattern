/**
 * User controllers.
 */
define(['angular'], function(angular) {
    'use strict';

    var UserCtrl = function ($scope, userService, $translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('user');
        $translate.refresh();
    };


    UserCtrl.$inject = ['$scope', 'userService', '$translate', '$translatePartialLoader'];


    return {
        UserCtrl: UserCtrl
    };

});
