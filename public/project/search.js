function search() {
	// Get the value from the search box
	var searchString = $("#txtSearch").val();
	console.log("Searching for: " + searchString);

	// Set up the parameters to send to the API
	var params = {s: searchString, apikey:"15623f33"};

	// Use jQuery to make the get request
	$.get("http://www.omdbapi.com/", params, function(data, status){
		// For debugging purposes, make a note that we're back
		console.log("Back from server with the following results:")
		console.log(status);
    	console.log(data);

    	updateList(data);
	});
}

function add(title) {
	console.log(title);
}

function updateList(data) {
	if (data.Search && data.Search.length > 0) {
		var resultList = $("#ulResults");
		resultList.empty();

		var i = 0;
		do {//name of image will change when I get it working
			resultList.append('<p><img onclick="" src="' + data.Search[i].Poster + 
				'" height="249" width="167" /><input type="text" name="image' + i + '" value="' + 
				data.Search[i].Poster +	'" hidden></p>');
			resultList.append('<p>' + data.Search[i].Title + 
				'</p><input type="text" name="title" value="' +	data.Search[i].Title +	
				'" hidden>');
			resultList.append("<input type='submit' value='Add to list'><br>");
			i++;
		} while (i <= data.totalResults)
	}

}