// 'use strict';

// Declare studyApp level module which depends on views, and components
var mainApp = angular.module('studyApp', [
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
            templateUrl: "views/profile.html",
            controller: "userCtrl",
            css: 'styles/profile.css'
        })
        .when('/DynamicCharts', {
            templateUrl: "views/dynamic-charts.html",
            controller: "dynamicChartsCtrl",
            css: "styles/dynamic-charts.css"
        })
        .otherwise({
            redirectTo: '/profile'
        });
}]);

mainApp.controller('HeaderContoller', function($scope, $location){
    $scope.isActive = function(viewLocation){
        return viewLocation === $location.path();
    }
});

// mainApp.run(['$rootScope', function($rootScope, ngProgressFactory) {
//     $rootScope.$on('$routeChangeStart', function(ev, data) {
//         ngProgress.start();
//     });

//     $rootScope.$on('$routeChangeSuccess', function(ev, data) {
//         ngProgress.complete();
//     });
// }]);
