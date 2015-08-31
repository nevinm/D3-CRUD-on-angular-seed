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
            templateUrl: "view1/profile.html",
            controller: "userCtrl",
            css: 'view1/styles/profile.css'
        })
        .when('/DynamicCharts', {
            templateUrl: "view2/dynamic_charts.html",
            controller: "dynamicChartsCtrl",
            css: "view2/styles/dynamic_charts.css"
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
