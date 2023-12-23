const feedPosts = document.getElementById("posts-section-div1");
const submitButton = document.getElementById("create-button");
const newPostTitle = document.getElementById("title-create");
const newPostBody = document.getElementById("body-create");
const newPostTag1 = document.getElementById("tag1-create");
const newPostTag2 = document.getElementById("tag2-create");
const newPostTag3 = document.getElementById("tag3-create");

function handleDeleteButton(parsedUserData, index, postElement) {
  parsedUserData.posts.splice(index, 1);
  localStorage.setItem("userPosts", JSON.stringify(parsedUserData));
  feedPosts.removeChild(postElement);
  location.reload();
}

function handleLikeButton(posts, parsedUserData, reactionNum, likeHeart) {
  posts.liked = !posts.liked;

  if (posts.liked) {
    posts.reactions++;
    likeHeart.classList.add("liked");
  } else {
    posts.reactions--;
    likeHeart.classList.remove("liked");
  }
  reactionNum.textContent = posts.reactions;
  localStorage.setItem("userPosts", JSON.stringify(parsedUserData));
}

function createPostElement(posts, parsedUserData, index) {
  let postMain = document.createElement("div");
  let postTitle = document.createElement("h3");
  let deleteBtn = document.createElement("button");
  let deleteIcon = document.createElement("span");
  let postBody = document.createElement("p");
  let postTags = document.createElement("ul");
  let postReactions = document.createElement("div");
  let likeBtn = document.createElement("button");
  let likeHeart = document.createElement("span");
  let reactionNum = document.createElement("i");

  postMain.classList.add("post-main");
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
    if (tag.trim() === "") {
      tagItem.remove();
    } else {
      postTags.append(tagItem);
    }
    if (posts.liked) {
      likeHeart.classList.add("liked");
    }

    postMain.append(postTitle, deleteBtn, postBody, postTags, postReactions);
    deleteBtn.append(deleteIcon);
    postReactions.append(likeBtn, reactionNum);
    likeBtn.append(likeHeart);
  });

  deleteBtn.addEventListener("click", () =>
    handleDeleteButton(parsedUserData, index, postMain)
  );

  likeBtn.addEventListener("click", () =>
    handleLikeButton(posts, parsedUserData, reactionNum, likeHeart)
  );

  return postMain;
}

function userPosts() {
  const parsedUserData = JSON.parse(localStorage.getItem("userPosts")) || {
    posts: [],
  };
  const userPosts = parsedUserData.posts;

  if (parsedUserData == null || userPosts.length === 0) {
    return console.log("No user posts in local data!");
  } else {
    console.log("There are " + userPosts.length + " user posts stored!");

    userPosts.forEach((posts, index) => {
      const postElement = createPostElement(posts, parsedUserData, index);
      feedPosts.append(postElement);
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

document.addEventListener("DOMContentLoaded", userPosts);