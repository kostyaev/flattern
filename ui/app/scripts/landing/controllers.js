/**
 * User controllers.
 */
define(['angular', 'jquery', 'bootbox'], function(angular, $, bootbox) {
    'use strict';

    var LandingCtrl = function ($scope, landingService) {
        $scope.msgBox = function (str) {
            bootbox.alert(str).removeClass("fade").find(".bootbox-body").css('text-align', 'center');
        };

        $scope.send = function() {
            landingService.send($scope.user)
                .success(function (data) {
                    $scope.msgBox(data.msg)
                    $scope.buttonDisabled = true;
                })
                .error(function (data) {
                    $scope.msgBox(data.msg)
                });
        };

    };

    LandingCtrl.$inject = ['$scope', 'landingService'];

    return {
        LandingCtrl: LandingCtrl
    };

});
