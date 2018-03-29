var app = require('express')();
var bodyParser = require('body-parser');
var Random = require('./random.js');

const patients = [];


app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/addPatient', function (req, res) {
    var patient = req.body;
    patient.id = Random.uuid();
    patients.push(patient);
    res.json(patient);
});

app.get('/loadPatients', function (req, res) {
    res.json(patients);
});

app.get('/getPatient', function (req, res) {
    var id = req.query.id;
    res.json(patients.find(item => item.id == id));
});


app.get('/removePatient', function (req, res) {
    var id = req.query.id;
    patients.splice(patients.findIndex(item => item.id == id), 1);
    res.end('true');
});

module.exports = app;