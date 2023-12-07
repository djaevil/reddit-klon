function postsFunction() {
  var feedPosts = document.getElementById("posts-section-div2");
  var parsedData = JSON.parse(localStorage.getItem("fetchedData"));
  var posts = parsedData.posts;

  posts.forEach((post) => {
    var postElement = document.createElement("div");
    var postTitle = document.createElement("h3");
    var postBody = document.createElement("p");
    var postTags = document.createElement("ul");
    var postReactions = document.createElement("div");
    var reactionNum = document.createElement("i");

    postElement.classList.add("post-main");
    postTitle.classList.add("post-title");
    postBody.classList.add("post-body");
    postTags.classList.add("post-tags");
    postReactions.classList.add("reactions");
    reactionNum.classList.add("likes");

    postTitle.textContent = post.title;
    postBody.textContent = post.body;
    postReactions.innerHTML = "<span class='material-symbols-outlined heart'>favorite</span>";
    reactionNum.textContent = post.reactions;

    post.tags.forEach((tag) => {
      var tagItem = document.createElement("li");
      tagItem.textContent = tag;
      postTags.append(tagItem);
    });
    feedPosts.append(postElement);
    postElement.append(postTitle, postBody, postTags, postReactions);
    postReactions.append(reactionNum);
  });
}

fetch("https://dummyjson.com/posts")
  .then((res) => res.json())
  .then((data) => {
    var dataString = JSON.stringify(data);
    var localDataString = JSON.parse(localStorage.getItem("fetchedData"));

    if (localDataString === null) {
      localStorage.setItem("fetchedData", dataString);
      console.log("Data has been stored!");
      return postsFunction();
    } else {
      console.log("Data has already been stored!")
      return postsFunction();
    }
  })
  .catch((error) => {
    postsFunction();
    console.error("Error fetching data:", error);
  })
  .finally(() => {
    let hearts = document.querySelectorAll(".heart");
    let likes = document.querySelectorAll(".likes");
    hearts.forEach(function(span) {
      span.addEventListener("click", function(){
          console.log("It works!");
      })
    })
  })
