function userPosts() {
  if (localStorage.getItem("1") === null) {
    return console.log("No user posts in local data");
  } else {
    var feedPosts = document.getElementById("posts-section-div1");
    var parsedData = JSON.parse(localStorage.getItem("1"));
    var posts = parsedData.posts[0];
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

    postTitle.textContent = posts.title;
    postBody.textContent = posts.body;
    likeBtn.innerText = "Like";
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

    likeBtn.append(likeHeart);
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
      localStorage.setItem("1", JSON.stringify(parsedData));
    });
    if (posts.liked) {
      likeHeart.classList.add("liked");
    }

    feedPosts.append(postElement);
    postElement.append(postTitle, postBody, postTags, postReactions);
    postReactions.append(likeBtn, reactionNum);
  }
}

let submitButton = document.getElementById("create-button");

submitButton.addEventListener("click", function () {
  let newPostTitle = document.getElementById("title-create");
  let newPostBody = document.getElementById("body-create");
  let newPostTag1 = document.getElementById("tag1-create");
  let newPostTag2 = document.getElementById("tag2-create");
  let newPostTag3 = document.getElementById("tag3-create");

  if(newPostTitle.value === "" || newPostBody.value === "") {
    window.alert("Please add Title and/or Main text!", "OK");
  } else {
    let newPost = {
      posts: [
        {
          title: newPostTitle.value,
          body: newPostBody.value,
          tags: [newPostTag1.value, newPostTag2.value, newPostTag3.value],
          reactions: 0,
        },
      ],
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
  }
});

document.addEventListener("DOMContentLoaded", userPosts());