/*var databaseUrl = "diarydb";
var collections = ["notes"];
*/
var mongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/diarydb';
var db, notesCollection;
// Use connect method to connect to the Server
mongoClient.connect(url, function (err, db) {
	console.log("Connected to mongo server");
	db = db;
	notesCollection = db.collection("notes");
	// db.close();
});
// var db = require("mongodb").connect(databaseUrl, collections);
var mongoInterface = {
	find: function (param, callback) {
		notesCollection.find({
			title: param.title
		}).toArray(function (err, data) {
			if (err) {
				console.log("No title found");
				callback(null);
			} else {
				console.log("collection found ", data);
				callback(data);
			}
		});
		return db;
	},
	insert: function (data, callback) {
		notesCollection.insert(data, function (err, result) {
			if (err) {
				console.log("Data cannot be saved");
				callback(null);
			} else {
				callback(result);
			}
		});
	}
};

module.exports = mongoInterface;