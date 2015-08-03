(function () {
	"use strict";
	angular.module('notesApp', [
	    'ngRoute',
	  ]).config(function ($routeProvider, $httpProvider) {

		$routeProvider.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		}).when('/newNote', {
			templateUrl: 'views/newNote.html',
			controller: 'NewNoteCtrl'
		}).otherwise({
			redirectTo: '/'
		});

		// Over-ride default OPTIONS
		// delete $httpProvider.defaults.headers.common['X-Requested-With'];
		// console.log("angular default headers", $httpProvider.defaults);
		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
	});
})();