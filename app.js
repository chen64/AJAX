$(document).ready(function(){

    var topics = ["shrug", "salute", "wave"];

    $("#topicButtons").on("click", function(){
        var topic = $(this).data("topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6XPpgYRMRSDHJoXuZnglJscGARaX4Ge7&q=" +
        topic +"&limit=10&offset=0&rating=G&lang=en"

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            for(i = 0; i < results.length; i++){
                var rating = results[i].rating;
                var topicDiv = $("<div>");
                var p = $("<p>").text("Rating: " + rating);
                var topicImage = $("<img>").addClass("gif");
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-state", "still");
                topicDiv.append(p);
                topicDiv.append(topicImage);
                $("#topic").append(topicDiv);
            }
        })
    })
    
    function renderButtons() {

        $("#topicButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          //a.addClass("movie");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#topicButtons").append(a);
        }
    }

    $("#addTopic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        renderButtons();
      });

    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");
        if(state == "still"){
            var URL = $(this).attr("data-animate")
            $(this).attr("src", URL);
            $(this).attr("data-state", "animate");
        }
        else{
            var URL = $(this).attr("data-still")
            $(this).attr("src", URL);
            $(this).attr("data-state", "still");
        }
    })
    renderButtons();

});