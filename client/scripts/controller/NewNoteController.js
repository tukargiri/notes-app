"use strict";
angular.module('notesApp')
	.controller('NewNoteCtrl', ['$scope', '$http',
		function ($scope, $http) {
			$scope.title = "";
			$scope.data = "";
			$scope.saveNewNote = function () {
				console.log("we have title = %s and data = %s", $scope.title, $scope.data);
				// $http({
				/*$http.post(
					"http://localhost:8989/saveData", {
						title: $scope.title,
						data: $scope.title
					}
				)*/
				$http({
					url: "http://localhost:8989/saveData",
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						title: $scope.title,
						data: $scope.data
					}
				}).success(function () {
					console.log("data saved successfully");
				}).error(function () {
					console.log("data cannot be saved successfully");
				});

				/*$.ajax({
					url: "http://localhost:8989/saveData",
					method: "POST",
					data: {
						title: $scope.title,
						data: $scope.data
					}
				});*/
			};
		}
	]);