$(document).ready(function() {
  const myTopics = [
    "James Webb Telescope",
    "World of Warcraft",
    "George Carlin",
    "YOLO",
    "Cats",
    "iPhone 11",
    "Samsung Galaxy Note 10+",
    "Deep space",
    "Javascript",
    "EAGLES!"
  ];
  function createTopicBtn(name) {
    var topicBtn = $("<button>");
    topicBtn.attr("class", "topic-btn");
    topicBtn.attr("data", name);
    topicBtn.text(name);
    topicBtn.appendTo($(".topic-btns"));
    $(topicBtn).on("click", function(event) {
      event.preventDefault();
      var queryTerm = $(this).attr("data");
      console.log(queryTerm);
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        queryTerm +
        "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var counter = 0;
        var results = [];
        results[counter] = response.data;

        for (var i = 0; i < results[counter].length; i++) {
          var gifDiv = $("<div>");
          gifDiv.attr("class", "card");
          var rating = results[counter][i].rating;
          console.log(results[counter][i]);
          var resultImage = $("<img>");
          var cardBody = $("<div>");
          var p = $("<p>");
          p.attr("class", "card-text");
          p.text("Rating: " + rating);
          resultImage.attr("class", "card-img-top");
          resultImage.attr("arr-x", counter);
          resultImage.attr("arr-y", i);
          resultImage.attr(
            "src",
            results[counter][i].images.original_still.url
          );
          resultImage.attr("state", "still");
          gifDiv.prepend(p);
          gifDiv.prepend(cardBody);
          gifDiv.prepend(resultImage);
          $(".results-area").prepend(gifDiv);
          $(resultImage).on("click", function() {
            var state = $(this).attr("state");
            var x = $(this).attr("arr-x");
            var y = $(this).attr("arr-y");

            var still = results[x][y].images.original_still.url;
            var animated = results[x][y].images.original.url;
            if (state === "still") {
              $(this).attr("src", animated);
              $(this).attr("state", "animated");
            } else {
              $(this).attr("src", still);
              $(this).attr("state", "still");
            }
          });
        }
        counter++;
        console.log(results);
      });
    });
  }

  for (var i = 0; i < myTopics.length; i++) {
    createTopicBtn(myTopics[i]);
  }
  $(".add-topic-btn").on("click", () => {
    var newTopic = $(".new-topic-box").val();
    createTopicBtn(newTopic);
  });
});
