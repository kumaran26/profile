var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('./'))
app.use(express.static('./libs/'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8002);