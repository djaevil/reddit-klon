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
    var likeBtn = document.createElement("button");
    var likeHeart = document.createElement("span");
    var reactionNum = document.createElement("i");

    postElement.classList.add("post-main");
    postTitle.classList.add("post-title");
    postBody.classList.add("post-body");
    postTags.classList.add("post-tags");
    postReactions.classList.add("reactions");
    likeBtn.classList.add("likeBtn");
    likeHeart.classList.add("material-symbols-outlined");
    reactionNum.classList.add("likesNum");

    postTitle.textContent = post.title;
    postBody.textContent = post.body;
    likeHeart.textContent = "favorite";
    reactionNum.textContent = post.reactions;

    post.tags.forEach((tag) => {
      var tagItem = document.createElement("li");
      tagItem.textContent = tag;
      postTags.append(tagItem);
    });

    likeBtn.append(likeHeart);
    likeBtn.addEventListener("click", function () {
      post.liked = !post.liked;
      
      if (post.liked) {
        post.reactions++;
        likeHeart.classList.add("liked");
      } else {
        post.reactions--;
        likeHeart.classList.remove("liked");
      }
      reactionNum.textContent = post.reactions;
      localStorage.setItem("fetchedData", JSON.stringify(parsedData));
    });
    if (post.liked) {
      likeHeart.classList.add("liked");
    }

    feedPosts.append(postElement);
    postElement.append(postTitle, postBody, postTags, postReactions);
    postReactions.append(likeBtn, reactionNum);
  });
}

fetch("https://dummyjson.com/posts")
  .then((res) => res.json())
  .then((data) => {
    var dataString = JSON.stringify(data);
    var localDataString = JSON.parse(localStorage.getItem("fetchedData"));

    if (localDataString === null) {
      localStorage.setItem("fetchedData", dataString);
      console.log("DummyJSON data has been stored!");
      return postsFunction();
    } else {
      console.log("DummyJSON data has already been stored!");
      return postsFunction();
    }
  })
  .catch((error) => {
    postsFunction();
    console.error("Error fetching data:", error);
  });