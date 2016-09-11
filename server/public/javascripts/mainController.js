
var app  = angular.module('IOT',['ngRoute','ngResource']);


app.factory('APIRest', ['$resource', function($resource){
	var factory;
	factory.postData = $resource('/:deviceKind/switch/:deviceId', {}, {
		'switch':{
			method:'POST',
		}
	});
	factory.getData = $resource('/devices', {}, {
		'devices':{
			method:'POST',
			isArray:true
		}
	});
	return factory;
}]);

app.controller('mainController',[ '$scope', 'APIRest', function ($scope,APIRest){
	// body...
	$scope.deviceKind= undefined;
	$scope.deviceId = undefined;
	$scope.onOff = function(){
		APIRest.postData.switch({deviceKind: $scope.deviceKind, deviceId: $scope.deviceId});
	}
	$scope.devices = {};
	$scope.getDevices = function(){
		$scope.devices = APIRest.getData.devices();
	}
}]);


app.config(['$routeProvider',function($routeProvider){
	// $urlRouterProvider.otherwise('/main');
	$routeProvider.
	when('/',{
		templateUrl: '/index',
		controller: '/public/javascripts/mainController.js'
	}).
	when('/users/login',{
		templateUrl:'/users/login'
	}).
	otherwise('/main');
}]);
