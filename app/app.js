// 'use strict';

// Declare studyApp level module which depends on views, and components
angular.module('studyApp', [
    'ngRoute',
    'ngProgress',
    'studyAppProfile',
    'studyApp.view2',
    'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/profile', {
            templateUrl: "view1/profile.html",
            controller: "userCtrl"
        })
        .when('/view2', {
            templateUrl: "view2/view2.html",
            controller: "View2Ctrl"
        })
        .otherwise({
            redirectTo: '/profile'
        });
}])

// run(['$rootScope', function($rootScope, ngProgressFactory) {
//     $rootScope.$on('$routeChangeStart', function(ev, data) {
//         ngProgress.start();
//     });

//     $rootScope.$on('$routeChangeSuccess', function(ev, data) {
//         ngProgress.complete();
//     });
// }]);
