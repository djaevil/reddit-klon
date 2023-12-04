function postsFunction() {
  var feedPosts = document.getElementById("posts-section-div2");
  var parsedData = JSON.parse(localStorage.getItem("fetchedData"));
  var posts = parsedData.posts;

  posts.forEach((post) => {
    var postElement = document.createElement("div");
    var postTitle = document.createElement("h3");
    var postBody = document.createElement("p");
    var postTags = document.createElement("ul");
    postElement.classList.add("post-main");
    postTitle.classList.add("post-title");
    postBody.classList.add("post-body");
    postTags.classList.add("post-tags");
    
    postTitle.textContent = post.title;
    postBody.textContent = post.body;

    post.tags.forEach((tag) => {
      var tagItem = document.createElement("li");
      tagItem.textContent = tag;
      postTags.append(tagItem);
    });
    feedPosts.append(postElement);
    postElement.append(postTitle, postBody, postTags);
  });
}

fetch("https://dummyjson.com/posts")
  .then((res) => res.json())
  .then((data) => {
    var dataString = JSON.stringify(data);
    var localDataString = localStorage.getItem("fetchedData");

    if (dataString === localDataString) {
      console.log("Data already fetched");
      return postsFunction();
    } else {
      localStorage.setItem("fetchedData", dataString);
      console.log("Data stored locally:", data);
      return postsFunction();
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
