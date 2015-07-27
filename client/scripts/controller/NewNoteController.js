(function () {
	"use strict";
	angular.module('notesApp').controller('NewNoteCtrl', ['$scope', '$http',
		function ($scope, $http) {
			$scope.title = "";
			$scope.data = "";
			$scope.displayLoader = false;
			$scope.infoMessage = "";

			$scope.closePopUp = function () {
				$scope.popUpProperties.popUpVisible = false;
			};

			$scope.saveNewNote = function () {
				$scope.displayLoader = true;
				console.log("we have title = %s and data = %s", $scope.title, $scope.data);

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
					$scope.displayLoader = false;
					$scope.infoMessage = "Data saved successfully";
					console.log("data saved successfully");
				}).error(function () {
					$scope.displayLoader = false;
					$scope.infoMessage = "Data cannot be saved successfully";
					console.log("data cannot be saved successfully");
				});
			};
		}
	]);
})();