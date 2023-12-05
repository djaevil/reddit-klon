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
    let newPostTitle = document.getElementById("title-create");
    let newPostBody = document.getElementById("body-create");
    let newPostTag1 = document.getElementById("tag1-create");
    let newPostTag2 = document.getElementById("tag2-create");
    let newPostTag3 = document.getElementById("tag3-create");
    let newPost = {
        title: newPostTitle.value,
        body: newPostBody.value,
        tags: [newPostTag1.value, newPostTag2.value, newPostTag3.value]
    }
    let newPostString = JSON.stringify(newPost);
    localStorage.setItem("newPost", newPostString);
    newPostTitle.value = "";
    newPostBody.value = "";
    newPostTag1.value = "";
    newPostTag2.value = "";
    newPostTag3.value = "";
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
