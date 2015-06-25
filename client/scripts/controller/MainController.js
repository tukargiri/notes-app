"use strict";
angular.module('notesApp')
	.controller('MainCtrl', ['$scope', '$http', '$location',
		function ($scope, $http, $location) {
			$scope.notes = [];

			$scope.addNewNote = function () {
				$location.path("/newNote");
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