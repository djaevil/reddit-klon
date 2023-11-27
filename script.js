fetch('https://dummyjson.com/posts')
.then(res => res.json())
.then(data => {
    localStorage.setItem("fetchedData", JSON.stringify(data));
    console.log("Data stored locally:", data);
})
.catch(error => console.error("Error fetching data:", error));

const storedData = localStorage.getItem("fetchedData");

if (storedData) {
    const parsedData = JSON.parse(storedData);
    const feedPosts = document.getElementById("feed-posts");
    
    parsedData.forEach(post => {
        const postElement = document.createElement("div");
        const postTitle = document.createElement("h3");
        const postBody = document.createElement("p");
        const postTags = document.createElement("span")

        postElement.classList.add("post-main");
        postTitle.classList.add("post-title");
        postBody.classList.add("post-body");
        postTags.classList.add("post-tags");

        postTitle.textContent = post.title;
        postBody.textContent = post.body;
        postTags.textContent = post.tags;
        
        feedPosts.append(postElement);
        postElement.append(postTitle, postBody, postTags);
    });
} else {
    console.log("No data found in local storage");
}
            