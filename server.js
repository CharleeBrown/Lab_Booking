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
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
})



app.get('/', (req, res, next) => {
  //console.log(collection.find());x`
 //client.close();
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

       const query = { "name": "naruto" };

return collection.find(query)
  .sort()
  .toArray()
  .then(items => {
    console.log(`Successfully found ${items.length} documents.`)
    console.log(items[0].bookDate)
   // res.send(items[0].name)
   let checks = items[0].bookDate
  console.log(checks);
  res.json({name:items[0].name})
  //res.send(checks[0])
  // items.forEach(res.send(JSON.parse(items)));
  // items.forEach(res.send('<BODY> <h1>' + items[tems]+'</h1></BODY></HTML>'))
   // res.send('<BODY> <h1>' + items[0].bookDate+'</h1></BODY></HTML>')
    
    return items
  })
  .catch(err => console.error(`Failed to find documents: ${err}`))
          
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
