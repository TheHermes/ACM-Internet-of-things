angular.module('Admin')
    .controller('UserListController', function($scope, Users, NgTableParams){
        $scope.users = new NgTableParams({
                // page: 1,
                // count: 10
            },
            {
                getData: Users.query
            }
        );

    });