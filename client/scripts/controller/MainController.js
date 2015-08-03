(function () {
	"use strict";

	angular.module('notesApp').controller('MainCtrl', ['$scope', 'ajax',
		function ($scope, ajax) {
			$scope.notes = [];
			$scope.searchText = "";
			$scope.mode = null;
			$scope.currentNoteData = {};
			$scope.infoMessage = "";
			$scope.popUpProperties = {
				popUpVisible: false
			};

			$scope.$watch('popUpProperties.popUpVisible', function (newValue) {
				if (newValue === false) {
					$scope.getNotesList();
				}
			});

			$scope.clearSearch = function () {
				$scope.searchText = "";
				$scope.searchTextChanged(null);
			};

			$scope.searchTextChanged = function (keyEvent) {
				// console.log("search text = ", $scope.searchText, arguments);
				if (keyEvent === null || keyEvent.which === 13) {
					// Ajax to search title or data
					ajax.searchNote({
						title: $scope.searchText,
						data: $scope.searchText
					}, function (response) {
						$scope.notes = response.items;
					});
				}
			};

			$scope.addNewNote = function () {
				$scope.currentNoteData = {};
				$scope.mode = null;

				$scope.popUpProperties.popUpVisible = true;
			};

			$scope.editNote = function (noteData) {
				$scope.currentNoteData = noteData;
				$scope.mode = "edit";

				$scope.popUpProperties.popUpVisible = true;
			};

			$scope.deleteNote = function (noteData) {
				ajax.deleteNote(noteData, function () {
					$scope.notes = $scope.notes.filter(function (note) {
						return note._id !== noteData._id;
					});
					console.log("success");
				});
			};

			$scope.getNotesList = function () {
				ajax.listAllData(function (response) {
					$scope.notes = response.items;
				});
			};
		}
	]);
})();