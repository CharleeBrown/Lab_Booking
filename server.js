const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://lee:Gamez2232@cluster0.guc9f.mongodb.net/mainDB?retryWrites=true&w=majority";
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




app.get('/', (req, res, next) => {
  //console.log(collection.find());
 //client.close();
 next();
 });
 
  
  app.post('/apptlist.html', (req, res) => {
    console.log('SUCCESS');
    });


  app.get('/applist', (req,res) => {
   
      client.connect( async err=>{
        if(err) throw err;
       await collection.find({name:'Coleman'});
       res.send('it works');
          
      });
    
  });
      
        // collection.findOne({}, function(err, result){
        //   if(err) {console.log(err);}
        //   if(result){console.log(result);}
        //   else{console.log("nope");}
        // });
      



app.post('/test', (req, res) => {
  if(req.body.userName != null && req.body.dates != null && req.body.startTime != null && req.body.leaveTime!=null){
      client.connect(err => {
                let obj = {name:req.body.userName, 
                          bookDate:new Date(req.body.dates).toDateString(), 
                          startTime:req.body.startTime, 
                          stopTime:req.body.leaveTime};
                collection.insertOne(obj);       
                res.redirect('/apptlist.html');
                                     });
                client.close();
                                   }
                                        });
                                        
app.listen(process.env.PORT||3000, function(){
console.log('listening on port 3000');
});
