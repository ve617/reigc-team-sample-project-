let likeCount = 0;

function likePost() {
    likeCount++;
    document.getElementById("likeCount").innerText = likeCount;
}

//poll

let newsVotes = 0;
let blogVotes = 0;

function vote(type) {
    if (type === "news") {
        newsVotes++;
        document.getElementById("newsVotes").innerText = newsVotes;
    } else {
        blogVotes++;
        document.getElementById("blogVotes").innerText = blogVotes;
    }
}

//comment
function addComment() {
    const input = document.getElementById("commentInput");
    const commentText = input.value;

    if (commentText.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = commentText;
        document.getElementById("commentList").appendChild(li);
        input.value = "";
    }
}

