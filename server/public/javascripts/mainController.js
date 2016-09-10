
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
	when('/main',{
		templateUrl: './main.jade',
		controller: 'mainController'
	}).
	when('/users/login',{
		templateUrl:'./login.jade'
	}).
	otherwise('/main');
}]);
