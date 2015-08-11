// 'use strict';

// Declare studyApp level module which depends on views, and components
angular.module('studyApp', [
    'ngRoute',
    'ngProgress',
    'studyAppProfile',
    'studyApp.DynamicCharts',
    'door3.css',
    'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/profile', {
            templateUrl: "view1/profile.html",
            controller: "userCtrl",
            css: 'view1/profile.css'
        })
        .when('/DynamicCharts', {
            templateUrl: "view2/dynamic_charts.html",
            controller: "dynamicChartsCtrl",
            css: "view2/dynamic_charts.css"
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
