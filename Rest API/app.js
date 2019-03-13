/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var http = require("http");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var admin = require("firebase-admin");
var serviceAccount = require("./mycrm-d955f.json");

admin.initializeApp({

  credential: admin.credential.cert(serviceAccount),

  databaseURL: "https://mycrm-d955f.firebaseio.com"

});

app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/listUsers'  method='get' name='form1'>";
  html += "Contact ID:</p><input type='number' name='contact'><br/><br/>";
  html += "<input type='submit' value='submit'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});

var db = admin.firestore();
var docRef = db.collection('contacts');

app.get('/listUsers',/* @callback */ function (req, res) {
	
	var d1 = "C00" +req.query.contact;
   var contactRef = docRef.doc(d1);
	var getDoc = contactRef.get()
  .then(doc => {
    if (!doc.exists) {
		var e1 = "No such Document :: " +d1;
      res.status(404).send(e1);
    } else {
		console.log(doc.data());
      res.send(doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
	res.status(500).send('Error getting document');
  }); 
});


 app.post('/createUser', urlencodedParser, function (req, res){
	 
	var c1 =  "C00"+req.body.contactno;
	 var setAda = {
  
  name: req.body.name,
  organization: req.body.org,
  phone: req.body.mobile,
  email: req.body.email,
  address: req.body.address,
  dob: req.body.dob,
  available: req.body.avl,
 
};

	docRef.doc(c1).set(setAda);
  res.send(setAda);
 });


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

