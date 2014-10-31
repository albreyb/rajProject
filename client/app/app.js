app = angular.module('rajProject', []);

app.controller('MainCtrl', ['scope', function($scope){
	$scope.test = 'Hello World';
}])