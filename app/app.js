// 'use strict';

// Declare studyApp level module which depends on views, and components
angular.module('studyApp', [
    'ngRoute',
    'ngProgress',
    'studyAppProfile',
    'studyApp.view2',
    'studyApp.version',
    'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/profile'
    });
}]).

run(['$rootScope', function($rootScope, ngProgressFactory) {
    $rootScope.$on('$routeChangeStart', function(ev, data) {
        ngProgress.start();
    });

    $rootScope.$on('$routeChangeSuccess', function(ev, data) {
        ngProgress.complete();
    });
}]);
