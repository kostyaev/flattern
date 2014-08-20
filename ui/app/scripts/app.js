define(['angular', 'home', 'about', 'general', 'translations', 'auth', 'house']/*deps*/, function (angular)/*invoke*/ {
    'use strict';

    var app = angular
        .module('app',
            ['flattern.home',
                'flattern.about',
                'flattern.general',
                'flattern.translations',
                'flattern.auth',
                'flattern.house'
            ]);
    app.constant('USER_ROLES', {
        all   : '*',
        admin : 'admin',
        editor: 'editor',
        guest : 'guest'
    });

    return app;
});
