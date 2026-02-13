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

