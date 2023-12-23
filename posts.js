function postsFunction() {
  const feedPosts = document.getElementById("posts-section-div2");
  const parsedData = JSON.parse(localStorage.getItem("fetchedData"));
  const posts = parsedData.posts;

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    const postTitle = document.createElement("h3");
    const postBody = document.createElement("p");
    const postTags = document.createElement("ul");
    const postReactions = document.createElement("div");
    const likeBtn = document.createElement("button");
    const likeHeart = document.createElement("span");
    const reactionNum = document.createElement("i");

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
      let tagItem = document.createElement("li");
      tagItem.textContent = tag;
      postTags.append(tagItem);
    });

    function handleLikeButton(post, parsedData, reactionNum) {
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
    }

    likeBtn.addEventListener("click", function () {
      handleLikeButton(post, parsedData, reactionNum);
    });

    if (post.liked) {
      likeHeart.classList.add("liked");
    }

    feedPosts.append(postElement);
    postElement.append(postTitle, postBody, postTags, postReactions);
    postReactions.append(likeBtn, reactionNum);
    likeBtn.append(likeHeart);
  });
}

function onPageLoad() {
  const localDataString = localStorage.getItem("fetchedData");

  if (localDataString !== null) {
    console.log("DummyJSON data has already been stored!");
    postsFunction();
  } else {
    fetch("https://dummyjson.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const dataString = JSON.stringify(data);
        localStorage.setItem("fetchedData", dataString);
        console.log("DummyJSON data has been stored!");
        postsFunction();
      })
      .catch((error) => {
        postsFunction();
        console.error("Error fetching data:", error);
      });
  }
}

document.addEventListener("DOMContentLoaded", onPageLoad);