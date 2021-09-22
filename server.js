const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://lee:Gamez2232@cluster0.guc9f.mongodb.net/mainDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const parser = require('body-parser');
const multer = require('multer');
const upload = multer();
const express = require('express'); 
const app = express();


app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(upload.array());

app.use(express.static('public'));


app.get('/', (req, res) => {

  res.send('Hello');
  console.log(req.body);
});

// app.post('/', (req, res, next) => {
//  app.use(express.static('otherPublic'));
// });

app.post('/test', (req, res, next) => {
  
  client.connect(err => {
    if(err == null){
      const collection = client.db("mainDB").collection("calLab");
      // perform actions on the collection object
      
      let obj = {Name:"COOL!", Date:new Date(req.body.dates).toDateString()};
      collection.insertOne(obj);
      console.log("Test Success!");
    
    };
    
});
client.close();
  res.send('date: ' + req.body.dates);
  
  //console.log(req.body);
  //res.send('Successful');
  //fs.ReadStream('otherPublic/index2.html');

  
});




app.listen(3000, function(){
  console.log('listening on port 3000');
});










