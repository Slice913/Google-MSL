const express = require('express');
const { send } = require('express/lib/response');
const app = express()
const port = 3000
const mongoose = require('mongoose');
const { db } = require('./api/models/store');
const Store = require('./api/models/store');

mongoose.connect('mongodb+srv://Slicefpv:Spiderman2w3@cluster0.vmsuk.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json({limit: '50mb'}));

 
app.post('/api/stores', (req, res) => {
  let dbstores = [];
  let stores = req.body;
  stores.forEach((store)=>{
    dbstores.push({
      storeName: store.name, 
      phoneNumber: store.phoneNumber,
      address: store.address,
      openStatusText: store.openStatusText,
      addressLines: store.addressLines, 
      location: {
        type: "Point",
          "coordinates" : [
             store.coordinates.longitude,
             store.coordinates.latitude
          ]
        }
     })
  })
   
  Store.create(dbstores, (err, stores)=>{
     if(err){
      res.status(500).send(err);
     } else {
      res.status(200).send(stores);
     }
   })
 });



app.delete('/api/stores',  (req, res) => {
   Store.deleteMany({}, (err) => {
      res.status(200).send(err);
   })
})


// Spiderman2w3 MongoDB
app.get('/api/stores', (req, res) =>{
  Store.find({}, (err, stores)=>{
   if(err){
     res.status(500).send(err);
    } else {
      res.status(200).send(stores);
    }
  })
})
  



app.listen(port, () => {
  console.log(`Google Store Locator 🌏  ${port}`)
})