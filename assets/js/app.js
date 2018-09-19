// create an array of rappers - in this case, awesome 90's tv rappers
var rappers = ["Kanye West", "Andre 3000", "Kendrick Lamar", "Jay-Z", "Kid Cudi", "BROCKHAMPTON", "Chance the Rapper", "Notorious BIG"];

// creates buttons for each of these
function makeButtons(){ 
	// deletes the rappers prior to adding new rappers so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the rappers array
	for (var i = 0; i < rappers.length; i++){
		// dynamically makes buttons for every artist in the array
		var a = $('<button>') 
		a.addClass('artist'); // add a class
		a.attr('data-name', rappers[i]); // add a data-attribute
		a.text(rappers[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
}

// handles addartist button event
$("#addartist").on("click", function(){

	// grabs the user artist input
	var artist = $("#artist-input").val().trim();
	// that input is now added to the array
	rappers.push(artist);
	// the makeButtons function is called, which makes buttons for all my rappers plus the user artist
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})

// function to display gifs
function displayGifs(){
	var artist = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&limit=9&api_key=dc6zaTOxFJmzC";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var artistGif = $('<img>');
					artistGif.attr('src', results[i].images.fixed_height_still.url);
					// rappers the rating on hover
					artistGif.attr('title', "Rating: " + results[i].rating);
					artistGif.attr('data-still', results[i].images.fixed_height_still.url);
					artistGif.attr('data-state', 'still');
					artistGif.addClass('gif');
					artistGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(artistGif)
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying artist gifs
$(document).on("click", ".artist", displayGifs);

// initially calls the makeButtons function
makeButtons();