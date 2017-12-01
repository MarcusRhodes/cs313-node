function search() {
	// Get the value from the search box
	var searchString = $("#txtSearch").val();
	console.log("Searching for: " + searchString);

	// Set up the parameters to send to the API
	var params = {s: searchString, apikey:"15623f33"};

	// Use jQuery to make the get request
	$.get("https://www.omdbapi.com/", params, function(data, status){
		// For debugging purposes, make a note that we're back
		console.log("Back from server with the following results:")
		console.log(status);
    	console.log(data);

    	updateList(data);
	});
}

function updateList(data) {
	if (data.Search && data.Search.length > 0) {
		var resultList = $("#ulResults");
		resultList.empty();

		var i = 0;
		do {//name of image will change when I get it working
			resultList.append('<p><img src="' + data.Search[i].Poster + 
				'" height="249" width="167" /><input type="text" id="imageurl' + i + '" value="' + 
				data.Search[i].Poster +	'" hidden></p>');
			resultList.append('<p>' + data.Search[i].Title + 
				'</p><input type="text" id="favname' + i + '" value="' +	data.Search[i].Title +	
				'" hidden>');
			resultList.append('<input type="text" id="favtype' + i + '" value="' +	data.Search[i].Type +	
				'" hidden>');
			resultList.append('<p>Add a note! <input type="text" id="note' + i + '"></p>');
			resultList.append("<button onclick='selection(" + i + ");'>Add to list</button><br>");
			resultList.append("<div id='status" + i + "'></div>");
			i++;
		} while (i <= data.totalResults)
	}

}

function selection(num) {
	var imageurl = $("#imageurl" + num).val();
	var favname = $("#favname" + num).val();
	var username = $("#username").val();
	var favtype = $("#favtype" + num).val();
	var note = $("#note" + num).val();
	
	var params = {
		imageurl: imageurl,
		favname: favname,
		username: username,
		favtype: favtype,
		note: note
	};

	$.post("/add2DB", params, function(result) {
		if (result && result.success) {
			$("#status" + num).text("Successfully logged in.");
		} else {
			$("#status" + num).text("Error logging in.");
		}
	});
}

function loadList() {
	$.get("/getList", function(data, status){
		// For debugging purposes, make a note that we're back
		console.log("This is the loadlist function");
		console.log(status);
		var resultList = $("#list");
		resultList.empty();
		//resultList.append(data[0].favname);
    	makeList(data);
	});
}

function makeList(data) {
		var i = 0;
		var resultList = $("#list");
		resultList.empty();
		
		do {//name of image will change when I get it working
			resultList.append("THIS IS WORKING!!!");
			
			resultList.append('<p>Name: ' + data[i].username + '</p>');
			resultList.append('<p>'+ data[i].username +'\'s favorite ' + data[i].favtype + ' is '+ data[i].favname +'. <br>');
	
			resultList.append('<img src="' + data[i].imageurl +	'" height="249" width="167" /></p>');
			resultList.append('<p>'+ data[i].username +'\'s comment: ' + data[i].note + '</p>');
			resultList.append('<br>');
			i++;
		} while (i <= Object.keys(data).length)

}