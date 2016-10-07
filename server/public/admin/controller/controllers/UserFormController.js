angular.module('Admin')
    .controller("UserFormController", function ($scope, $window, Users) {
        $scope.cleanForm = function(){
            if($scope.user_form)
                $scope.user_form.$setPristine();
            $scope.user = {};
        };
        $scope.cleanForm();

        $scope.saveData = function () {
            if($scope.user_form.$valid){
                $scope.new_user = new Users($scope.user);

                var res = Users.save($scope.new_user,function(){
                    $scope.savedSuccessfully = true;
                    $scope.connectionError = false;
                    $scope.last_username = $scope.user.username;
                    $scope.user =  {};
                    $scope.user_form.$setPristine();
                    console.log(res);
                    return true;
                }, function(err){
                    $scope.savedSuccessfully = false;
                    $scope.connectionError = true;
                    return false;
                });
            }
            else{
                $scope.triedToSubmit = true;
                console.log("Invalid Form");
            }
        };

        $scope.cleanForm = function(){
            $scope.user_form.$setPristine();
            $scope.user = {};
            $scope.info = {
                connectionError: false,
                savedSuccessfully: false
            };
        };
        $scope.finalize = function(){
            console.log("Finalizing...");
            $window.location.href('/admin/user_list')

        }
    });