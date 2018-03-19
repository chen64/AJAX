$(document).ready(function(){

    var topics = [];

    $("#topicButtons").on("click", function(){
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=6XPpgYRMRSDHJoXuZnglJscGARaX4Ge7&limit=10"
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
                var topicImage = $("<img>");
                topicImage.attr("src", results[i].images.fixed_height.url);
                topicDiv.append(p);
                topicDiv.append(topicImage);
                $("#topic").prepend(topicDiv);
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

});