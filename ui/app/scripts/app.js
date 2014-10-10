define(['angular', 'home', 'user', 'house', 'company', 'template', 'general', 'i18n'], function (angular) {
    'use strict';

    return angular
        .module('app',
        [
            'flattern.home',
            'flattern.user',
            'flattern.house',
            'flattern.company',
            'flattern.template',
            'flattern.general',
            'flattern.i18n',
            'nya.bootstrap.select',
            'akoenig.deckgrid',
            'angularFileUpload'
        ]);
});
