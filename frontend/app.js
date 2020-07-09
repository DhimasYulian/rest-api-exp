const postList = document.querySelector('.posts-list');
const addPost = document.querySelector('.add-form');
const titleValue = document.getElementById('title');
const contentValue = document.getElementById('content');
const btnSubmit = document.querySelector('.btn');
let item = '';

const endpoints = 'http://localhost:5000/api/posts';

const renderPost = (posts) => {
    posts.forEach(post => {
        item += `
        <div class="card mt-4 col-md-6 bg-light">
            <div class="card-body" data-id=${post._id}>
                <h5 class="card-title">${post.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
                <p class="card-text">${post.content}</p>
                <a href="" class="card-link" id="edit-post">Edit</a>
                <a href="" class="card-link" id="delete-post">Delete</a>
            </div>
        </div>
        `;
    });
    postList.innerHTML = item;
}

// Get Posts
fetch(endpoints)
    .then(res => res.json())
    .then(data => renderPost(data))

// Create Posts
addPost.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(endpoints, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleValue.value,
                content: contentValue.value
            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArray = [];
            dataArray.push(data);
            renderPost(dataArray);
        })
})

// Edit and Delete Post
postList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButton = e.target.id == "delete-post";
    let editButton = e.target.id == "edit-post";

    let postId = e.target.parentElement.dataset.id;

    // Delete Post
    if (delButton) {
        fetch(`${endpoints}/${postId}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(() => location.reload())
    }

    // Edit Post
    if (editButton) {
        // Select parent element(.card-body)
        const card = e.target.parentElement;

        // Select Title and Content of clicked Card
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardContent = card.querySelector('.card-text').textContent;

        // Change the input to value of clicked card
        titleValue.value = cardTitle;
        contentValue.value = cardContent;
    }
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${endpoints}/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: titleValue.value,
                    content: contentValue.value
                })
            })
            .then(res => res.json())
            .then(() => location.reload())
    })
})