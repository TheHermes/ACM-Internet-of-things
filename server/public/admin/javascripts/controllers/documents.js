(function(angular) {
    angular.module('DocumentApp',['ngResource', 'ngRoute', 'ngTable'])
    .factory('DocumentType', function($resource){
        return $resource('/document_type/:id');
    })
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
               templateUrl: '/admin/document_type_form',
               controller: 'DocumentFormCont',
            })
            .when('/list', {
                templateUrl: '/admin/document_type_list',
                controller: 'DocumentListCont',
            });
    });
    angular.module('DocumentApp')
        .controller("DocumentFormCont", function ($scope, $window, DocumentType) {
            $scope.cleanForm = function(){
                if($scope.doc_form)
                    $scope.doc_form.$setPristine();
                $scope.document = {};
                $scope.document.fields = [{}];
                $scope.info = {
                    connectionError: false,
                    savedSuccessfully: false,
                };
                $scope.numberOfFields = 1;
                console.log($scope.numberOfFields);
                $scope.last_title = "";
            }
            $scope.cleanForm();

            $scope.saveData = function () {
                console.log("Sending...");
                if($scope.doc_form.$valid){
                    $scope.new_document = new DocumentType($scope.document);

                    var res = DocumentType.save($scope.new_document,function(){
                        $scope.savedSuccessfully = true;
                        $scope.connectionError = false;
                        $scope.last_title = $scope.document.title;
                        $scope.document =  {};
                        $scope.doc_form.$setPristine();
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
                $scope.doc_form.$setPristine();
                $scope.document = {};
                $scope.info = {
                    connectionError: false,
                    savedSuccessfully: false,
                };
            };
            $scope.addField = function(num){
                if(num == 1)
                    $scope.document.fields.push({});
                else if(num == -1 && $scope.document.fields.length > 1)
                    $scope.document.fields.pop();
                console.log($scope.numberOfFields);
            };
            $scope.finalize = function(){
                console.log("Finalizing...");

                    $window.location.href('/admin/data_types')

            }
        });
        angular.module('DocumentApp')
            .controller("DocumentListCont", function($scope, DocumentType, NgTableParams){
                $scope.types = new NgTableParams({
                        page: 1,
                        count: 10,
                    },
                    {
                      data: DocumentType.query(),
                    }
                );
            });
}(angular));