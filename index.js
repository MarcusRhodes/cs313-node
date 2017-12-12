//http://localhost:5000/project/project.html
//https://stormy-garden-79016.herokuapp.com/project/project.html

var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));  

const querystring = require('querystring');

var pg = require("pg"); //'postgres://postgres:aurelius6908@127.0.0.1:5432/fav';
const connectionString = process.env.DATABASE_URl;
//process.env.DATABASE_URl;

var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//adding the movie or game into postgres
app.post('/add2DB', function(request, response) {
	add2DB(request, response);
});

app.get('/getList', function(request, response) {
	getList(request, response);
});

//this is part of everything, though.
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getList(request, response) {
	const { Client } = require('pg');

	const client = new Client({
  		connectionString: process.env.DATABASE_URL,
  		ssl: true,
	});
	//*/var client = new pg.Client(connectionString);

   client.connect(function(err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }

       var sql = "SELECT * FROM fav";

       var query = client.query(sql, function(err, result) {
            client.end(function(err) {
                if (err) throw err;
            });

           if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }

           //console.log("Found result: " + JSON.stringify(result.rows));
           response.status(200).json(result.rows);
           //callback(null, result.rows);
        });
    });
    
}

function add2DB(request, response) {
   var requestUrl = url.parse(request.url, true);
   adding2DB(request.body, function(error, result) {
       if (error || result == null || result.length != 1) {
           response.status(500).json({success: false, data: error});
       } else {
           var person = result[0];
           response.status(200).json(result[0]);
       }
   });
}

function adding2DB(req, callback) {
	const { Client } = require('pg');

	const client = new Client({
  		connectionString: process.env.DATABASE_URL,
  		ssl: true,
	});   
   //*/var client = new pg.Client(connectionString);

   client.connect(function(err) {
        if (err) {
            console.log("Error connecting to DB: ");
            console.log(err);
            callback(err, null);
        }
  	var queryConfig = {
  		text: 'INSERT INTO fav(username, favtype, imageurl, favname, note) VALUES($1, $2, $3, $4, $5);',
  		values: [req.username, req.favtype, req.imageurl, req.favname, req.note]
  	};
  	console.log(queryConfig);
   client.query(queryConfig, function (err, result) {
     		if (err) {
     			return console.error(err);
     		}
     		callback(null, result.rows);
   	});
   });

}