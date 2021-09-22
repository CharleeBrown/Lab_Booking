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
  if(req.body.userName != null && req.body.dates != null && req.body.startTime != null && req.body.leaveTime!=null){

  
  client.connect(err => {
    if(err == null){
      const collection = client.db("mainDB").collection("CalLabBooking");
      // perform actions on the collection object
      
      let obj = {name:req.body.userName, 
                bookDate:new Date(req.body.dates).toDateString(), 
                startTime:req.body.startTime, 
                stopTime:req.body.leaveTime};
      collection.insertOne(obj);
      if(client.getLogger().isError){
        console.log(client.getLogger().getErrorMessage());
      }
          }
res.redirect('/');

client.close();
});
  }
  else{
    res.redirect('/');
    alert('empty information');
  }
});


app.listen(process.env.PORT||3000, function(){
  console.log('listening on port 3000');
});










