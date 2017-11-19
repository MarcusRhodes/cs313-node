//http://localhost:5000/getFav?id=1
//https://stormy-garden-79016.herokuapp.com/getFav?id=1

var express = require('express');
var app = express();

var pg = require("pg"); //'postgres://postgres:aurelius6908@127.0.0.1:5432/fav'
const connectionString = process.env.DATABASE_URL;
//process.env.DATABASE_URl;

var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getFav', function(request, response) {
    getFav(request, response);
});
//all this is part of another assignment
app.get('/mail', function(request, response) {
	calculateRate(request, response);
});
//this is part of both, though.
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
//all this is part of another assignment
function calculateRate(request, response) {
	var requestUrl = url.parse(request.url, true);

	var mailType = requestUrl.query.operation;
	var weight = Number(requestUrl.query.weight);
	var result = 0;

	if (mailType == "Stamped") {
		if (weight < 1) {
			result = 0.49;
		}
		else if (weight < 2) {
			result = 0.70;
		}
		else if (weight < 3) {
			result = 0.91;
		}
		else {
			result = 1.12;
		}
	} else if (mailType == "Metered") {
		if (weight < 1) {
			result = 0.46;
		}
		else if (weight < 2) {
			result = 0.67;
		}
		else if (weight < 3) {
			result = 0.88;
		}
		else {
			result = 1.09;
		}		
	} else if (mailType == "Flats") {
		if (weight < 1) {
			result = 0.98;
		}
		else if (weight < 2) {
			result = 1.19;
		}
		else if (weight < 3) {
			result = 1.40;
		}
		else {
			result = 1.61;
		}
	} else if (mailType == "Parcel") {
		if (weight < 1) {
			result = 3.00;
		}
		else if (weight < 2) {
			result = 3.00;
		}
		else if (weight < 3) {
			result = 3.00;
		}
		else {
			result = 3.00;
		}
	} else if (mailType == "Snail") {
		result = "Well, if you are going by that, you will never get it there!";
	} else {
		
	}

	var params = {mailType: mailType, weight: weight, result: result}	
	
	response.render('pages/result', params);
}

function getFav(request, response) {
    var id = request.query.id;
    getPersonFromDb(id, function(error, result) {
        if (error || result == null || result.length != 1) {
            response.status(500).json({success: false, data: error});
        } else {
            var person = result[0];
            response.status(200).json(result[0]);
        }
    });
}

function getPersonFromDb(id, callback) {
    console.log("Getting person from DB with id: " + id);

   var client = new pg.Client(connectionString);

   client.connect(function(err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }

       var sql = "SELECT * FROM fav WHERE id = $1::int";
       var sql = "SELECT * FROM fav WHERE id = $1::int";
        var params = [id];

       var query = client.query(sql, params, function(err, result) {
            client.end(function(err) {
                if (err) throw err;
            });

           if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }

           console.log("Found result: " + JSON.stringify(result.rows));
           callback(null, result.rows);
        });
    });

} // end of getPersonFromDb*/
/*
//cd /home/marcus/node-js-getting-started
//heroku local
//http://localhost:5000/form.html
var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/mail', function(request, response) {
	calculateRate(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function calculateRate(request, response) {
	var requestUrl = url.parse(request.url, true);

	var mailType = requestUrl.query.operation;
	var weight = Number(requestUrl.query.weight);
	var result = 0;

	if (mailType == "Stamped") {
		if (weight < 1) {
			result = 0.49;
		}
		else if (weight < 2) {
			result = 0.70;
		}
		else if (weight < 3) {
			result = 0.91;
		}
		else {
			result = 1.12;
		}
	} else if (mailType == "Metered") {
		if (weight < 1) {
			result = 0.46;
		}
		else if (weight < 2) {
			result = 0.67;
		}
		else if (weight < 3) {
			result = 0.88;
		}
		else {
			result = 1.09;
		}		
	} else if (mailType == "Flats") {
		if (weight < 1) {
			result = 0.98;
		}
		else if (weight < 2) {
			result = 1.19;
		}
		else if (weight < 3) {
			result = 1.40;
		}
		else {
			result = 1.61;
		}
	} else if (mailType == "Parcel") {
		if (weight < 1) {
			result = 3.00;
		}
		else if (weight < 2) {
			result = 3.00;
		}
		else if (weight < 3) {
			result = 3.00;
		}
		else {
			result = 3.00;
		}
	} else if (mailType == "Snail") {
		result = "Well, if you are going by that, you will never get it there!";
	} else {
		
	}

	var params = {mailType: mailType, weight: weight, result: result}	
	
	response.render('pages/result', params);
}


//cd /home/marcus/node-js-getting-started/
//npm start
//http://localhost:5000/form.html
/*
var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/math', function(request, response) {
	handleMath(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function handleMath(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));

	// TODO: Here we should check to make sure we have all the correct parameters

	var operation = requestUrl.query.operation;
	var operand1 = Number(requestUrl.query.operand1);
	var operand2 = Number(requestUrl.query.operand2);

	computeOperation(response, operation, operand1, operand2);
}

function computeOperation(response, op, left, right) {
	op = op.toLowerCase();

	var result = 0;

	if (op == "add") {
		result = left + right;
	} else if (op == "subtract") {
		result = left - right;		
	} else if (op == "multiply") {
		result = left * right;
	} else if (op == "divide") {
		result = left / right;
	} else {
		// It would be best here to redirect to an "unknown operation"
		// error page or something similar.
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {operation: op, left: left, right: right, result: result};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}
*/
