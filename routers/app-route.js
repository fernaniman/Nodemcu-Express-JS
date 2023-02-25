const router    = require('express').Router();
const mqtt = require("mqtt");
var client = mqtt.connect('mqtt://test.mosquitto.org');
const bodyParser = require('body-parser');

var suhu, suhu2;
var kelembaban, kelembaban2;

client.on('connect', function() {
    client.subscribe("s/tep");
    console.log("client has subscribe succecfully");
});

client.on('message', function(topic, message){
    // console.log(message.toString());
    // var suhu = message.toString();
    // suhu2 = JSON.parse(suhu);
    var obj = JSON.parse(message);
    console.log(obj);
    suhu = obj.temp;
    kelembaban = obj.hum;
    // console.log(suhu);
    // console.log(kelembaban);
})

router.get('/', function (req, res) {
    res.render('home', {a1: suhu, a2: kelembaban, a3: suhu2, a4:kelembaban2});
});

router.get('/coba', function (req, res) {
    res.render('coba');
});

router.get('/tes', function (req, res) {
    res.render('tes');
});

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/post-test', (req, res) => {
    console.log('Got body:', req.body);
    suhu2 = req.body.temp2;
    kelembaban2 = req.body.hum2;
    res.sendStatus(200);
});

router.get('/subs', function (req, res) {
    res.render('subs');
});

router.get('/about', function (req, res) {
    res.render('about');
});

module.exports = router;



