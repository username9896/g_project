const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vicky4830:vicky111@cluster0.lmsnl7w.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const Mqttdata = require('./models/device');
const randomCoordinates = require('random-coordinates');
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const app = express();
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const sensorport = new SerialPort({ path: 'COM3', baudRate: 9600 }, false)
const parser = sensorport.pipe(new ReadlineParser({ delimiter: '\r\n' }))
sensorport.on("open", () => {
    console.log('serial port open');
});

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");


parser.on('data', function (data) {
    console.log(data)
    const newDevice = new Mqttdata({
        data:data
    });
    newDevice.save();
})

client.on('message', (topic, message) => {
    if (topic == '/sensorData') {
        const data = JSON.parse(message);
        console.log(data);
    }
});

app.get('/send-command/mqttdata', (req, res) => {
    Mqttdata.find()
    .then((data)=>{
        res.send(data);
    })
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});