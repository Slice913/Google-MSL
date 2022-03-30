const express = require('express');
const { send } = require('express/lib/response');
const app = express();
const axios = require('axios');
const port = 3000
const mongoose = require('mongoose');
const { db } = require('./api/models/store');
const Store = require('./api/models/store');
const GoogleMapService = require('./api/services/googleMapService');
const googleMapsService = new GoogleMapService();
require('dotenv').config();

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', "*");
  next();
})

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
          coordinates: [
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

 
 // Spiderman2w3 MongoDB
 app.get('/api/stores', (req, res) =>{
   const zipCode = req.query.zip_code;
   googleMapsService.getCoordiantes(zipCode)
   .then((coordinates) =>{
     Store.find({
          location: {
            $near: {
              $maxDistance: 3218,
              $geometry: {
                type: "Point",
                coordinates: coordinates
              } 
            }
          }
        },  (err, stores) =>{
          if(err){
            res.status(500).send(err);
          } else {
            res.status(200).send(stores);
          }
        })
      }).catch((error)=>{
        console.log(error);
      })
      
          })
          
          app.delete('/api/stores',  (req, res) => {
             Store.deleteMany({}, (err) => {
                res.status(200).send(err);
             })
          })
          
          
          app.listen(port, () => {
            console.log(`Google Store Locator 🌏  ${port}`)
          })