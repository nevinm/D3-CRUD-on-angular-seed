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
    $scope.loading = true;
    $scope.animationsEnabled = true;

    $http.get('http://inorthwind.azurewebsites.net/Service1.svc/getAllCustomers')
        .then(function(res) {
            $scope.loading = false;
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
            controller: 'addUserCtrl'
        });

        addInstance.result.then(function(data) {
            $scope.user = data;
            $rootScope.userDetails.unshift($scope.user);
        }, function() {});
    }

    $scope.editUser = function(index, currentUser) {
        currentUser.index = index;
        var editInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'view1/addUser.html',
            size: "sm",
            controller: 'editUserCtrl',
            resolve: {
                currentUser: function() {
                    return currentUser;
                }
            }
        });

        editInstance.result.then(function(data) {
            $scope.user = data;
            $rootScope.userDetails[index].City = data.City;
            $rootScope.userDetails[index].CompanyName = data.CompanyName;
            $rootScope.userDetails[index].CustomerID = data.CustomerID;
        }, function() {});
    }
});

app.controller('deleteUserCtrl', function($rootScope, $scope, $modalInstance, index) {
    $scope.index = index;

    $scope.ok = function() {
        $scope.userDetails.splice(index, 1);
        $modalInstance.close($scope.index);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('addUserCtrl', function($rootScope, $scope, $modalInstance) {
    $scope.ok = function() {
        $modalInstance.close($scope.newuser);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('editUserCtrl', function($rootScope, $scope, $modalInstance, currentUser) {
    $scope.newuser = {
        "City": currentUser.City,
        "CompanyName": currentUser.CompanyName,
        "CustomerID": currentUser.CustomerID,
        "$$hashKey": currentUser.$$hashKey,
        "index": currentUser.index
    };
    $scope.ok = function() {
        $modalInstance.close($scope.newuser);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
