"use strict";

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var ObjectID = require('mongodb').ObjectID;
var COLLECTION_NAMES = ["counters", "notes"];

// Connection URL
var url = 'mongodb://localhost:27017/diarydb';
var DB;
// Use connect method to connect to the Server
mongoClient.connect(url, function (err, db) {
	console.log("Connected to mongo server");
	DB = db;
});

// TODO :- find a way to insert following row, if counters collection does not exists
// db.counters.insert({ _id: "notesId", seq: 0 });
// db.counters.findAndModify({query: {_id: "notedId" }, update: {$inc: {seq: 1 } }, new: true });
var mongoInterface = {
	find: function (param, callback) {
		var notesCollection = DB.collection(COLLECTION_NAMES[1]);
		var searchParams = {};

		if (Object.keys(param).length) {
			if (param._id) {
				var reqId = new ObjectID(searchParams._id);
				searchParams._id = reqId;
			} else {
				console.log("Please pass id");
				// callback(null);
			}
		}

		notesCollection.find(searchParams).toArray(function (err, data) {
			if (err) {
				// console.log("No title found");
				callback(null);
			} else {
				console.log("collection found ", data);
				callback(data);
			}
		});
	},
	insert: function (data, callback) {
		var notesCollection = DB.collection(COLLECTION_NAMES[1]);

		notesCollection.insert(data, function (err, result) {
			if (err) {
				console.log("Data cannot be saved");
				callback(null);
			} else {
				callback(result);
			}
		});
	},
	delete: function (data, callback) {
		var notesCollection = DB.collection(COLLECTION_NAMES[1]);
		var reqId = new ObjectID(data._id);

		notesCollection.remove({
			"_id": reqId
		}, function (err, result) {
			if (err) {
				callback(null);
			} else {
				callback(result);
			}
		});
	},
	update: function (data, callback) {
		var notesCollection = DB.collection(COLLECTION_NAMES[1]);
		var reqId = new ObjectID(data._id);

		notesCollection.update({
			"_id": reqId
		}, {
			$set: {
				title: data.title,
				data: data.data
			}
		}, function (err, result) {
			if (err) {
				callback(null);
			} else {
				callback(result);
			}
		});
	}
};

module.exports = mongoInterface;