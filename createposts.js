function userPosts() {
  if (localStorage.getItem("1") === null) {
    return console.log("No user posts in local data");
  } else {
    var feedPosts = document.getElementById("posts-section-div1");
    var parsedData = JSON.parse(localStorage.getItem("1"));

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

    postTitle.textContent = parsedData.title;
    postBody.textContent = parsedData.body;
    postReactions.innerHTML = "<span class='material-symbols-outlined heart'>favorite</span>";
    reactionNum.textContent = parseFloat(parsedData.reactions);

    parsedData.tags.forEach((tag) => {
      var tagItem = document.createElement("li");
      tagItem.textContent = tag;
      if (tag === "") {
        tagItem.remove();
      } else {
        postTags.append(tagItem);
      }
    });
    feedPosts.append(postElement);
    postElement.append(postTitle, postBody, postTags, postReactions);
    postReactions.append(reactionNum);
  }
}

let submitButton = document.getElementById("create-button");

submitButton.addEventListener("click", function () {
  let newPostTitle = document.getElementById("title-create");
  let newPostBody = document.getElementById("body-create");
  let newPostTag1 = document.getElementById("tag1-create");
  let newPostTag2 = document.getElementById("tag2-create");
  let newPostTag3 = document.getElementById("tag3-create");
  let newPost = {
    title: newPostTitle.value,
    body: newPostBody.value,
    tags: [newPostTag1.value, newPostTag2.value, newPostTag3.value],
    reactions: 0,
  };
  console.log(newPost);
  let newPostString = JSON.stringify(newPost);
  localStorage.setItem("1", newPostString);
  newPostTitle.value = "";
  newPostBody.value = "";
  newPostTag1.value = "";
  newPostTag2.value = "";
  newPostTag3.value = "";
  userPosts();
});

document.addEventListener("DOMContentLoaded", userPosts());


/*
if (let i = 1; i <= localStorage.length; i++) {
    let num = 1;
    num + 1;
} else {
    localStorage.setItem("newPost" + num, newPostString);
    userPosts();
}

let fullLoad = document.addEventListener("DOMContentLoaded", userPosts());


function loop() {
  if (let i = 0; i <= localStorage.length; i++;) {

  }
  
  if(localStorage.key[0] = 1)
}
*/
