"use strict";

/*
---------------------------
	Mongo db commands
---------------------------

show dbs :- list of all collections
db.collectionName.insert({a:10}) - adds the object in the collection
db.collectionName.remove({}) - removes all rows the collection
use [database]; db.dropDatabase(); - removes the db
----------------------------

// TODO :- find a way to insert following row, if counters collection does not exists
db.counters.insert({ _id: "notesId", seq: 0 });
db.counters.findAndModify({query: {_id: "notedId"}, update: {$inc: {seq: 1}}, new: true});

*/

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var url = 'mongodb://localhost:27017/diarydb';

var DB;
var COLLECTION_NAMES = {
	COUNTERS: "counters",
	NOTES: "notes"
};
var RESPONSE = {
	SUCCESS: "success",
	SUCCESS_CODES: {
		FIND: "Data searched successful",
		INSERT: "Data inserted successfully",
		DELETE: "Data deleted successfully",
		UPDATE: "Data updated successfully"
	},
	ERROR: "error",
	ERROR_CODES: {
		501: "DB Error 501 :- cannot find data for given search criteria",
		502: "DB Error 502 :- cannot insert data",
		503: "DB Error 503 :- cannot delete data for given key",
		504: "DB Error 504 :- cannot update given record"
	}
};
// This response format will be constant for any kind of request
var resposeObj = {
	type: "",
	message: "",
	items: []
};


mongoClient.connect(url, function (err, db) {
	console.log("Connected to mongo server");
	DB = db;
});


var mongoInterface = {
	data: {
		modified: true
	},
	find: function (param, callback) {
		var notesCollection = DB.collection(COLLECTION_NAMES.NOTES),
			searchParams = {};

		// db.notes.find({$or: [{'title': 'title'}, {'data': 'title'}]});
		// db.notes.find({'title': 'title'});
		// db.notes.find({"title": { $regex: /^title/i}});
		// db.notes.find({$or: [{"title": { $regex: /^title/i}}, {"data": { $regex: /^data/i}}]});
		if (Object.keys(param).length) {
			if (param._id) {
				searchParams._id = new ObjectID(searchParams._id);
			} else {
				var titleRegEx = new RegExp("^" + param.title, "i");
				var dataRegEx = new RegExp("^" + param.data, "i");
				searchParams = {
					$or: [{
						"title": {
							$regex: titleRegEx
						}
					}, {
						"data": {
							$regex: dataRegEx
						}
					}]
				};
				/*searchParams = {
					title: titleRegEx
				};*/
			}
		}

		console.log(searchParams);

		// Can implement caching mechanism here
		// Check if data is modified
		/*if (this.data.modified) {
			// search the collection
		} else {
			// return stored data
		}*/
		notesCollection.find(searchParams).toArray(function (err, data) {
			if (err) {
				resposeObj.type = RESPONSE.ERROR;
				resposeObj.message = RESPONSE.ERROR_CODES[501];
				resposeObj.items = [];
			} else {
				resposeObj.type = RESPONSE.SUCCESS;
				resposeObj.message = RESPONSE.SUCCESS_CODES.FIND;
				resposeObj.items = data;
			}
			callback(resposeObj);
		});
	},
	insert: function (data, callback) {
		var notesCollection = DB.collection(COLLECTION_NAMES.NOTES);

		notesCollection.insert(data, function (err, result) {
			if (err) {
				resposeObj.type = RESPONSE.ERROR;
				resposeObj.message = RESPONSE.ERROR_CODES[502];
				resposeObj.items = [];
			} else {
				resposeObj.type = RESPONSE.SUCCESS;
				resposeObj.message = RESPONSE.SUCCESS_CODES.INSERT;
				resposeObj.items = result;
			}
			callback(resposeObj);
		});
	},
	delete: function (id, callback) {
		var notesCollection = DB.collection(COLLECTION_NAMES.NOTES);

		notesCollection.remove({
			"_id": new ObjectID(id)
		}, function (err, result) {
			if (err) {
				resposeObj.type = RESPONSE.ERROR;
				resposeObj.message = RESPONSE.ERROR_CODES[503];
				resposeObj.items = [];
			} else {
				resposeObj.type = RESPONSE.SUCCESS;
				resposeObj.message = RESPONSE.SUCCESS_CODES.DELETE;
				resposeObj.items = result;
			}
			callback(resposeObj);
		});
	},
	update: function (newData, callback) {
		var notesCollection = DB.collection(COLLECTION_NAMES.NOTES);

		notesCollection.update({
			"_id": new ObjectID(newData._id)
		}, {
			$set: {
				title: newData.title,
				data: newData.data
			}
		}, function (err, result) {
			if (err) {
				resposeObj.type = RESPONSE.ERROR;
				resposeObj.message = RESPONSE.ERROR_CODES[504];
				resposeObj.items = [];
			} else {
				resposeObj.type = RESPONSE.SUCCESS;
				resposeObj.message = RESPONSE.SUCCESS_CODES.UPDATE;
				resposeObj.items = result;
			}
			callback(resposeObj);
		});
	}
};

module.exports = mongoInterface;