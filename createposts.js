function userPosts(){
    var feedPosts = document.getElementById("posts-section-div1");
    var parsedData = JSON.parse(localStorage.getItem("newPost"));

    var postElement = document.createElement("div");
    var postTitle = document.createElement("h3");
    var postBody = document.createElement("p");
    var postTags = document.createElement("ul");
    postElement.classList.add("post-main");
    postTitle.classList.add("post-title");
    postBody.classList.add("post-body");
    postTags.classList.add("post-tags");

    postTitle.textContent = parsedData.title;
    postBody.textContent = parsedData.body;

    parsedData.tags.forEach((tag) => {
      var tagItem = document.createElement("li");
      tagItem.textContent = tag;
      if (tag === ""){
        tagItem.remove();
      } else {
        postTags.append(tagItem);
      }
    });
    feedPosts.append(postElement);
    postElement.append(postTitle, postBody, postTags);
};

let submitButton = document.getElementById("create-button");

submitButton.addEventListener('click', function() {
    let newPostTitle = document.getElementById("title-create").value;
    let newPostBody = document.getElementById("body-create").value;
    let newPostTag1 = document.getElementById("tag1-create").value;
    let newPostTag2 = document.getElementById("tag2-create").value;
    let newPostTag3 = document.getElementById("tag3-create").value;
    let newPost = {
        title: newPostTitle,
        body: newPostBody,
        tags: [newPostTag1, newPostTag2, newPostTag3]
    }
    let newPostString = JSON.stringify(newPost);
    localStorage.setItem("newPost", newPostString);
    userPosts();
});

document.addEventListener("load", userPosts());

/*
if (let i = 1; i <= localStorage.length; i++) {
    let num = 1;
    num + 1;
} else {
    localStorage.setItem("newPost" + num, newPostString);
    userPosts();
}
*/
