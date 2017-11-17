// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var multer  = require('multer')
var upload = multer({ dest: 'public' })


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/upload", upload.single('myFile'), function (req, res, next) {
  if (!req.file) {
    console.log(JSON.stringify(req.headers))
    res.send({ error: "No file uploaded" })
  } else {
    console.log(req.file.size) 
    res.send({ filename: req.file.originalname, size: req.file.size })
  }
  
});

app.get("/upload", upload.single('myFile'), function (req, res, next) {
  console.log(req.file.size)
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
