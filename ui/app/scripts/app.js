define(['angular', 'home', 'user', 'house', 'company', 'template', 'general', 'i18n']/*deps*/, function (angular)/*invoke*/ {
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
            'flattern.i18n'
        ]);
});
