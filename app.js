$(document).ready(function(){

    var topics = [];

    $("#topicButtons").on("click", function(){
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6XPpgYRMRSDHJoXuZnglJscGARaX4Ge7&q="+topic+"&limit=10"
        
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
                topicImage.attr("src", results[i].images.fixed_height.still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-still", results[i].images.fixed_height.url);
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
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        }
        else{
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    })

});