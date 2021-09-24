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
   
    
      client.connect( async err=>{
      //   if(err) throw err;
      //  collection.find({ name: 'Coleman' });
      //  res.send('it works');
      // const projection = {'name'}
        const query = {};

return  collection.find({},{name:1, bookDate:0, startTime:0, _id:0}) 
  .sort()
  .toArray()
  .then(items => {
  //   console.log(`Successfully found ${items.length} documents.`)
  //   console.log(items[0].bookDate)
  //  // res.send(items[0].name)
  //  let checks = items[0].bookDate
  // console.log(checks);
  
    res.json(items)
  
  //res.send(checks[0])
  // items.forEach(res.send(JSON.parse(items)));
  // items.forEach(res.send('<BODY> <h1>' + items[tems]+'</h1></BODY></HTML>'))
   // res.send('<BODY> <h1>' + items[0].bookDate+'</h1></BODY></HTML>')
    
    return items
  })
  .catch(err => console.error(`Failed to find documents: ${err}`))
          
      });
    
  });


// app.post('/apptDel', (req, res) => {
//       client.connect(err =>{
//           collection.deleteOne({_id:req.params.id});
//       });
// });
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
                                        
app.listen(process.env.PORT||3000, function(){
//console.log('listening on port 3000');
});
