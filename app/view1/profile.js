'use strict';

var app = angular.module('myApp.profile', ['ngRoute', 'ngProgress']);

app.run(function($rootScope, ngProgress){
	$rootScope.$on('$routeChangeStart', function(ev, data){
		ngProgress.start();
	});

	$rootScrope.$on('$routeChangeSuccess', function(ev, data){
		ngProgress.complete();
	});
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'view1/profile.html',
    controller: 'profileCtrl'
  });
}])

app.controller('profileCtrl', [function($scope) {

}]);