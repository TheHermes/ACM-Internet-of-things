var app  = angular.module('IOT',['ngClick','ngResource']);



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
	routeProvider.
	when('/devices',{
		template: './index.jade'
	}).
	when('/home',{
		template:''
	}).
	otherwise('/home');
}]);
