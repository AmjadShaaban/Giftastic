$(document).ready(() => {
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
  function createTopic(name) {
    var topicBtn = $("<button>");
    topicBtn.text(name);
    topicBtn.appendTo($(".topic-btns"));
  }
  for (var i = 0; i < myTopics.length; i++) {
    createTopic(myTopics[i]);
  }
});
