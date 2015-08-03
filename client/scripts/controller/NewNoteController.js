(function () {
	"use strict";
	angular.module('notesApp').controller('NewNoteCtrl', ['$scope', 'ajax',
		function ($scope, ajax) {
			$scope.title = "";
			$scope.data = "";
			$scope.displayLoader = false;

			$scope.resetData = function () {
				$scope.mode = null;
				$scope.infoMessage = "";
			};

			$scope.closePopUp = function () {
				$scope.resetData();
				$scope.popUpProperties.popUpVisible = false;
			};

			$scope.$watch('currentNoteData', function (selectedNote) {
				console.log("currentNoteData changed", arguments);
				$scope.title = selectedNote.title;
				$scope.data = selectedNote.data;
			});

			$scope.saveNewNote = function () {
				$scope.displayLoader = true;

				var requestData = {
					title: $scope.title,
					data: $scope.data
				};

				if ($scope.mode === "edit") {
					requestData._id = $scope.currentNoteData._id;
					ajax.updateNote(requestData, function () {
						$scope.displayLoader = false;
						$scope.closePopUp();
						$scope.infoMessage = "Data saved successfully";
						console.log("data saved successfully");
					}, function () {
						$scope.displayLoader = false;
						$scope.infoMessage = "Data cannot be saved successfully";
						console.log("data cannot be saved successfully");
					});
				} else {
					ajax.saveNote(requestData, function () {
						$scope.displayLoader = false;
						$scope.closePopUp();
						$scope.infoMessage = "Data saved successfully";
						console.log("data saved successfully");
					}, function () {
						$scope.displayLoader = false;
						$scope.infoMessage = "Data cannot be saved successfully";
						console.log("data cannot be saved successfully");
					});
				}
			};
		}
	]);
})();