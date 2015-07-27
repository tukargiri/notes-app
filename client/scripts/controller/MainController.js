(function () {
	"use strict";

	angular.module('notesApp').controller('MainCtrl', ['$scope', '$http',
		function ($scope, $http) {
			$scope.notes = [];
			$scope.searchText = "";
			$scope.popUpProperties = {
				popUpVisible: false
			};

			/*$scope.$watch('searchText', function () {
				if ($scope.searchText.length >= 3) {
					// Ajax to search title or data
					$http({
						method: "GET",
						url: "http://localhost:8989/fetchData",
						params: {
							title: $scope.searchText,
							data: $scope.searchText
						}
					}).success(function (data) {
						$scope.notes = data.items;
					}).error(function () {
						console.log(arguments);
					});
				}
			}, true);*/

			$scope.clearSearch = function () {
				$scope.searchText = "";
				$scope.searchTextChanged(null);
			};

			$scope.searchTextChanged = function (keyEvent) {
				// console.log("search text = ", $scope.searchText, arguments);
				if (keyEvent === null || keyEvent.which === 13) {
					// Ajax to search title or data
					$http({
						method: "GET",
						url: "http://localhost:8989/fetchData",
						params: {
							title: $scope.searchText,
							data: $scope.searchText
						}
					}).success(function (data) {
						$scope.notes = data.items;
					}).error(function () {
						console.log(arguments);
					});
				}
			};

			$scope.addNewNote = function () {
				$scope.popUpProperties.popUpVisible = true;
			};

			$http({
				method: "GET",
				url: "http://localhost:8989/fetchData"
			}).success(function (data) {
				$scope.notes = data.items;
			}).error(function () {
				console.log(arguments);
			});
		}
	]);
})();