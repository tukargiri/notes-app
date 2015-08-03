(function () {
	"use strict";
	angular.module('notesApp').factory('ajax', ['$http',
		function ($http) {
			var URL = "http://localhost:8989";
			return {
				listAllData: function (successCallback, errorCallback) {
					$http({
						method: "GET",
						url: URL + "/fetchData"
					}).success(function (response) {
						successCallback(response);
					}).error(function () {
						errorCallback(arguments);
					});
				},
				searchNote: function (data, successCallback, errorCallback) {
					$http({
						method: "GET",
						url: URL + "/fetchData",
						params: {
							title: data.searchText,
							data: data.searchText
						}
					}).success(function (response) {
						successCallback(response);
					}).error(function () {
						errorCallback(arguments);
					});
				},
				deleteNote: function (data, successCallback, errorCallback) {
					$http({
						method: "DELETE",
						url: URL + "/deleteData/" + data._id
					}).success(function () {
						successCallback();
					}).error(function () {
						errorCallback(arguments);
					});
				},
				updateNote: function (data, successCallback, errorCallback) {
					$http({
						url: URL + "/updateData",
						method: "PUT",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						data: data
					}).success(function () {
						successCallback();
						/*$scope.displayLoader = false;
						// $scope.resetData();
						$scope.closePopUp();
						$scope.infoMessage = "Data saved successfully";
						console.log("data saved successfully");*/
					}).error(function () {
						errorCallback();
						/*$scope.displayLoader = false;
						$scope.infoMessage = "Data cannot be saved successfully";
						console.log("data cannot be saved successfully");*/
					});
				},
				saveNote: function (data, successCallback, errorCallback) {
					$http({
						url: URL + "/saveData",
						method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						data: data
					}).success(function () {
						successCallback();
						/*$scope.displayLoader = false;
						// $scope.resetData();
						$scope.closePopUp();
						$scope.infoMessage = "Data saved successfully";
						console.log("data saved successfully");*/
					}).error(function () {
						errorCallback();
						/*$scope.displayLoader = false;
						$scope.infoMessage = "Data cannot be saved successfully";
						console.log("data cannot be saved successfully");*/
					});
				}
			};
		}]);
})();