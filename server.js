const {
  MongoClient
} = require('mongodb');
const config = require('./configs.js');
const uri = config.connString;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const parser = require('body-parser');
const multer = require('multer');
const upload = multer();
const express = require('express');
const app = express();
const collection = client.db("mainDB").collection("CalLabBooking");
const {
  body,
  validationResult
} = require('express-validator');


app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));
app.use(upload.array());

// Setting the public folder as the root. 
app.use(express.static('public'));

// Allowing CORS requests.
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://lab-booking.herokuapp.com/');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Origin', 'https://lab-booking.herokuapp.com/apptlist.html');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});



// The server starts at the root of the public folder and reads the index file.
app.get('/', (req, res, next) => {

  next();
});

// When the list page is loaded.
app.get('/applist', (req, res) => {

  let nowDate = new Date().toISOString();
  client.connect(async err => {
    // The server queries the db for any bookings >= the current date.
    // const query = {
    //   bookDate: {
    //     $gte: nowDate
    //   }
    // };
    findInfo(req.body.userName, req.body.bookDate, req.body.startTime, req.body.stopTime);
    console.log(nowDate);

    // The query results are returned and send to the page.
    return collection.find(query)
      .sort()
      .toArray()
      .then(items => {

        res.json(items);
        return items;
      })
      .catch(err => console.error(`Failed to find documents: ${err}`))
  });
  client.close();
});

// The query results are returned and send to the page as above. 
app.get('/applistOld', (req, res) => {

  let nowDate = new Date().toISOString();
  client.connect(async err => {
    // But this query is looking for any bookings older than the current date.
    const query = {
      bookDate: {
        $lt: nowDate
      }
    };
    console.log(nowDate);


    return collection.find(query)
      .sort()
      .toArray()
      .then(items => {

        res.json(items);

        return items;
      })
      .catch(err => console.error(`Failed to find documents: ${err}`))

  });
  client.close();
});

// When the booking request is submitted.
app.post('/test', (req, res) => {
  client.connect(err => {
    // The form data is added to a JSON object and inserted into the database.
    if (err) throw err;
    let obj = {
      name: req.body.userName,
      bookDate: new Date(req.body.dates).toISOString(),
      startTime: req.body.startTime,
      stopTime: req.body.leaveTime
    };
    collection.insertOne(obj);
    // res.redirect('/apptlist.html');
    client.close();

  });


});


app.listen(process.env.PORT || 3000);