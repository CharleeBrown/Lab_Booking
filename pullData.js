const {
	MongoClient
} = require("mongodb");
const config = require("./configs.js");
const uri = config.connString;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const parser = require("body-parser");
const multer = require("multer");
const upload = multer();
const express = require("express");
const app = express();
const collection = client.db("mainDB").collection("CalLabBooking");
const {
	body,
	validationResult
} = require("express-validator");



function compareDate(req,res) {
	let query = {
		bookDate: req.body.bookDate,
		startTime: req.body.starTime
	};
	client.connect(async (err) => {
		return collection.find(query)
			.sort()
			.toArray()
			.then((items) => {
				if (items.length > 0){
					return 0;
				}
			});
		});
};
export compareData();