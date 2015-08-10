var app = angular.module('studyAppProfile', [
    'ngRoute',
    'ngProgress',
    'door3.css',
    'ui.bootstrap'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/profile', {
        templateUrl: 'view1/profile.html',
        controller: 'userCtrl',
        css: 'view1/profile.css'
    });
}])

app.controller('userCtrl', function($rootScope, $scope, $modal, $http) {
    $rootScope.userDetails = [];
    $scope.user = {};
    $scope.animationsEnabled = true;

    $http.get('http://inorthwind.azurewebsites.net/Service1.svc/getAllCustomers')
        .then(function(res) {
            $rootScope.userDetails = res.data.GetAllCustomersResult;
        });

    $scope.deleteUser = function(index) {
        var deleteInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'view1/deleteUser.html',
            controller: 'deleteUserCtrl',
            size: "sm",
            resolve: {
                index: function() {
                    return index;
                }
            }
        });
    }

    $scope.addUser = function() {
        var addInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'view1/addUser.html',
            size: "sm",
            controller: 'addUserCtrl',
            resolve: {
                user: function() {
                    return $scope.user;
                }
            }
        });

        addInstance.result.then(function(data) {
            $scope.user = data;
            $rootScope.userDetails.unshift($scope.user);
        }, function() {});
    }

    $scope.editUser = function(index, scope) {
        var editInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'view1/addUser.html',
            size: "sm",
            controller: 'editUserCtrl',
            resolve: {
                user: function() {
                    return scope;
                }
            }
        });

        // addInstance.result.then(function(data) {
        //     $scope.user = data;
        //     $rootScope.userDetails($scope.user);
        // }, function() {});
    }
});
