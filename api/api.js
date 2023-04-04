const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vicky4830:vicky111@cluster0.lmsnl7w.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const Device = require('./models/device'); 
const SecurityDevice = require('./models/device1'); 

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 5000;

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

/**
* @api {get} /api AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "dsohsdohsdofhsofhosfhsofh",
*      "name": "Mary's iPhone",
*      "user": "mary",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        },
*        {
*          "ts": "1529572230",
*          "temp": 17,
*          "loc": {
*            "lat": -37.850026,
*            "lon": 145.117683
*          }
*        }
*      ]
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/lightdevices', (req, res) => {
  Device.find({}, (err, lightdevices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(lightdevices);
    }
  });
});

app.get('/api/securitydevices', (req, res) => {
  SecurityDevice.find({}, (err, securitydevices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(securitydevices);
    }
  });
});

app.post('/api/lightdevices', (req, res) => {
  const { name, user } = req.body;
  const newDevice = new Device({
    name,
    user
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

app.post('/api/securitydevices', (req, res) => {
  const { name, user } = req.body;
  const newDevice = new SecurityDevice({
    name,
    user
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

// app.delete('/api/lightdevices', (req, res) => {
//   const { name, user } = req.body;
//   const newDevice = new Device({
//     name,
//     user
//   });
//   newDevice.save(err => {
//     return err
//       ? res.send(err)
//       : res.delete('successfully added device and data');
//   });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});