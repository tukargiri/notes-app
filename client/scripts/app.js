(function () {
	"use strict";
	angular.module('notesApp', [
	    'ngRoute'
	  ]).config(function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		}).when('/newNote', {
			templateUrl: 'views/newNote.html',
			controller: 'NewNoteCtrl'
		}).otherwise({
			redirectTo: '/'
		});
	});
})();