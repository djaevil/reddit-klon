fetch('https://dummyjson.com/posts')
.then(res => res.json())
.then(data => {
    localStorage.setItem("fetchedData", JSON.stringify());
    console.log("Data stored locally:", data);
})
.catch(error => console.error("Error fetching data:", error));

let storedData = localStorage.getItem("fetchedData");

if (storedData) {
    let parsedData = JSON.parse(storedData);
    let outputPosts = document.getElementById("feed-posts");
    
    parsedData.array.forEach(post => {
        let postElement = document.createElement("div");
        let postTitle = document.createElement("h3");
        let postBody = document.createElement("p");
        let postTags = document.createElement("span");

        postElement.classList.add("post-main");
        postTitle.classList.add("post-title");
        postBody.classList.add("post-body");
        postTags.classList.add("post-tags");

        outputPosts.appendChild(postElement);
        postElement.appendChild(postTitle, postBody, postTags);
    });
} else {
    console.log("No data found in local storage");
}
            