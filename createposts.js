let feedPosts = document.getElementById("posts-section-div1");
let submitButton = document.getElementById("create-button");
let newPostTitle = document.getElementById("title-create");
let newPostBody = document.getElementById("body-create");
let newPostTag1 = document.getElementById("tag1-create");
let newPostTag2 = document.getElementById("tag2-create");
let newPostTag3 = document.getElementById("tag3-create");

function userPosts() {
  var parsedData = JSON.parse(localStorage.getItem("userPosts"));
  var posts = parsedData.posts;

  if (parsedData == null || posts.length === 0) {
    return console.log("No user posts in local data!");
  } else {
    console.log("There are " + posts.length + " user posts stored!");

    posts.forEach((posts, index) => {
      var postElement = document.createElement("div");
      var postTitle = document.createElement("h3");
      var deleteBtn = document.createElement("button");
      var deleteIcon = document.createElement("span");
      var postBody = document.createElement("p");
      var postTags = document.createElement("ul");
      var postReactions = document.createElement("div");
      var likeBtn = document.createElement("button");
      var likeHeart = document.createElement("span");
      var reactionNum = document.createElement("i");

      postElement.classList.add("post-main");
      postTitle.classList.add("post-title");
      deleteBtn.classList.add("deleteBtn");
      deleteIcon.classList.add("material-symbols-outlined");
      postBody.classList.add("post-body");
      postTags.classList.add("post-tags");
      postReactions.classList.add("reactions");
      likeBtn.classList.add("likeBtn");
      likeHeart.classList.add("material-symbols-outlined");
      reactionNum.classList.add("likesNum");

      postTitle.textContent = posts.title;
      deleteIcon.textContent = "delete";
      postBody.textContent = posts.body;
      likeHeart.textContent = "favorite";
      reactionNum.textContent = posts.reactions;

      posts.tags.forEach((tag) => {
        var tagItem = document.createElement("li");
        tagItem.textContent = tag;
        if (tag === "") {
          tagItem.remove();
        } else {
          postTags.append(tagItem);
        }
      });

      deleteBtn.addEventListener("click", function() {  
        parsedData.posts.splice(index, 1);
        localStorage.setItem("userPosts", JSON.stringify(parsedData));
        feedPosts.removeChild(postElement);  
        location.reload()
      });

      likeBtn.addEventListener("click", function () {
        posts.liked = !posts.liked;

        if (posts.liked) {
          posts.reactions++;
          likeHeart.classList.add("liked");
        } else {
          posts.reactions--;
          likeHeart.classList.remove("liked");
        }
        reactionNum.textContent = posts.reactions;
        localStorage.setItem("userPosts", JSON.stringify(parsedData));
      });
      if (posts.liked) {
        likeHeart.classList.add("liked");
      }

      feedPosts.append(postElement);
      postElement.append(postTitle, deleteBtn, postBody, postTags, postReactions);
      deleteBtn.append(deleteIcon);
      postReactions.append(likeBtn, reactionNum);
      likeBtn.append(likeHeart);
    });
  }
}

submitButton.addEventListener("click", function () {
  if (newPostTitle.value === "" || newPostBody.value === "") {
    window.alert("Please add Title and/or Main text!", "OK");
  } else {
    let newPost = {
      title: newPostTitle.value,
      body: newPostBody.value,
      tags: [newPostTag1.value, newPostTag2.value, newPostTag3.value],
      reactions: 1,
      liked: true,
    };
    
    var parsedData = localStorage.getItem("userPosts") 
    ? JSON.parse(localStorage.getItem("userPosts"))
    : { posts: [] };

    parsedData.posts.push(newPost);
    localStorage.setItem("userPosts", JSON.stringify(parsedData));

    newPostTitle.value = "";
    newPostBody.value = "";
    newPostTag1.value = "";
    newPostTag2.value = "";
    newPostTag3.value = "";
    feedPosts.innerHTML = "";
    
    userPosts();
  }
});

document.addEventListener("DOMContentLoaded", userPosts());
