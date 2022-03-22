const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Store = require('./api/models/store');

mongoose.connect('mongodb+srv://Slicefpv:Spiderman2w3@cluster0.vmsuk.mongodb.net/?retryWrites=true&w=majority');

app.use(express.json({limit: '50mb'}));

 
app.post('/api/stores', (req, res) => {
  let dbstores = req.body;
   
  res.send('Another endpoint Yeah!');
})

app.delete('/api/stores',  (req, res) => {
   Store.deleteMany({}, (err) => {
      res.status(200).send(err);
   })
   
})

// Spiderman2w3 MongoDB
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Google Store Locator 🌏  ${port}`)
})