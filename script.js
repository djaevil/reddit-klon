fetch("https://dummyjson.com/posts")
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem("fetchedData", JSON.stringify(data));
    console.log("Data stored locally:", data);
  })
  .catch((error) => console.error("Error fetching data:", error));

var storedData = localStorage.getItem("fetchedData");
var feedPosts = document.getElementById("feed-posts");
var parsedData = JSON.parse(storedData);

for (let i = 0; i <= 30; i++) {
    if (parsedData.posts[i] === i) {
        var postElement = document.createElement("div");
        var postTitle = document.createElement("h3");
        var postBody = document.createElement("p");
        var postTags = document.createElement("ul");
      
        postElement.classList.add("post-main");
        postTitle.classList.add("post-title");
        postBody.classList.add("post-body");
        postTags.classList.add("post-tags");
      
        postTitle.textContent = parsedData.posts.title;
        postBody.textContent = parsedData.posts.body;
        postTags.textContent = parsedData.posts.tags;
      
        console.log(parsedData.posts.title);
      
        feedPosts.append(postElement);
        postElement.append(postTitle, postBody, postTags);
    }
}
