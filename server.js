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
});



app.post('/test', (req, res) => {
  
  client.connect(err => {
    if(err == null){
      const collection = client.db("mainDB").collection("calLab");
      // perform actions on the collection object
      
      let obj = {Name:"COOL!", Date:new Date(req.body.dates).toDateString()};
      collection.insertOne(obj);
      console.log("Test Success!");
          }
res.redirect('/');
client.close();
});
});


app.listen(process.env.PORT||3000, function(){
  console.log('listening on port 3000');
});










