$(document).ready(function() {
  var myTopics = [
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
    topicBtn
      .attr({
        class: "topic-btn",
        data: name
      })
      .text(name)
      .appendTo($(".topic-btns"));
    $(topicBtn).on("click", function(event) {
      event.preventDefault();
      var queryTerm = $(this).attr("data"),
        limit = 10,
        queryURL =
          "https://api.giphy.com/v1/gifs/search?q=" +
          queryTerm +
          "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" +
          limit;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var counter = 0,
          results = [];
        results[counter] = response.data;

        for (var i = 0; i < results[counter].length; i++) {
          var gifDiv = $("<div>").attr("class", "card"),
            rating = results[counter][i].rating,
            resultImage = $("<img>"),
            cardBody = $("<div>"),
            p = $("<p>");

          p.attr("class", "card-text").text("Rating: " + rating);

          resultImage.attr({
            class: "card-img-top",
            "arr-x": counter,
            "arr-y": i,
            src: results[counter][i].images.original_still.url,
            state: "still"
          });

          gifDiv.prepend(p, cardBody, resultImage);

          $(".results-area").prepend(gifDiv);

          $(resultImage).on("click", function() {
            var state = $(this).attr("state"),
              x = $(this).attr("arr-x"),
              y = $(this).attr("arr-y"),
              still = results[x][y].images.original_still.url,
              animated = results[x][y].images.original.url;

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
    myTopics.push(newTopic);
    console.log(myTopics);
    createTopicBtn(newTopic);
  });
});
