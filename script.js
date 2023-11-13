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
        postElement.textContainer = post.title;
        outputPosts.appendChild(postElement);
    });
}
            