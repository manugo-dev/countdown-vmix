var express = require('express');
var timerJs = require('easytimer');
var app = express();
var timer = new timerJs();
var time = 300;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/time', function (req, res) {
    res.send(timer.getTimeValues().toString());
});

app.get('/time/start', function (req, res) {
    if (req.query.seconds !== undefined){
        var time = parseInt(req.query.seconds);
    }
    try {
        timer.start({countdown: true, startValues: {seconds: time}})
    } catch (error) {
        res.send(error.toString());
    }
    res.send("Timer iniciado");
});

app.get('/time/pause', function (req, res) {
    try {
        timer.pause()
    } catch (error) {
        res.send(error.toString());
    }
    res.send("Timer pausado");
});

app.get('/time/stop', function (req, res) {
    try {
        timer.stop()
    } catch (error) {
        res.send(error.toString());
    }
    res.send("Timer detenido");
});

app.get('/time/reset', function (req, res) {
    try {
        timer.stop()
        timer.start()
    } catch (error) {
        res.send(error.toString());
    }
    res.send("Timer reiniciado");
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});