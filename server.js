const { MongoClient } = require('mongodb');
const config = require('./configs.js');
const uri = config.connString;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const parser = require('body-parser');
const multer = require('multer');
const upload = multer();
const express = require('express'); 
const app = express();
const collection = client.db("mainDB").collection("CalLabBooking");



app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use(upload.array());

app.use(express.static('public'));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://lab-booking.herokuapp.com/');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Origin', 'https://lab-booking.herokuapp.com/apptlist.html');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});



app.get('/', (req, res, next) => {
 
 next();
 });
 
  
  app.post('/apptlist.html', (req, res) => {
    console.log('SUCCESS');
    });


  app.get('/applist', (req,res) => {
   
    let nowDate = new Date();
      client.connect( async err=>{
    
        const query = {};

return  collection.find(query,{name:1, bookDate:0, startTime:0, _id:0}) 
  .sort()
  .toArray()
  .then(items => {

  
    res.json(items)
  

    
    return items
  })
  .catch(err => console.error(`Failed to find documents: ${err}`))
          
      });
    
  });

app.post('/test', (req, res) => {
  if(req.body.userName != null && req.body.dates != null && req.body.startTime != null && req.body.leaveTime!= null){
      client.connect(err => {
        
               if(err) throw err;
                let obj = {name:req.body.userName, 
                          bookDate:new Date(req.body.dates).toLocaleDateString(), 
                          startTime:req.body.startTime, 
                          stopTime:req.body.leaveTime};
                          console.log(obj.startTime);
                collection.insertOne(obj);       
                res.redirect('/apptlist.html');
                                     });
                client.close();
                                   }
                                        });
                                        
app.listen(process.env.PORT||3000);
