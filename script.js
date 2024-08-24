document.addEventListener('DOMContentLoaded', function() {
    const createPostButton = document.getElementById('createpost');
    const postForm = document.getElementById('postform');
    const postCreatedMessage = document.getElementById('postCreatedMessage');
    const contentDiv = document.getElementById('maincontent');
    const closeButton = document.getElementById('closebutton');
    const postContainer = document.querySelector('.post-container');

    let editingPost = null;

    createPostButton.addEventListener('click', () => {
        contentDiv.style.display = 'flex';
        postForm.reset();
        editingPost = null;
    });

    closeButton.addEventListener('click', () => {
        contentDiv.style.display = 'none';
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = postForm.querySelector('.title').value;
        const description = postForm.querySelector('.description').value;

        if (!title || !description) {
            alert('Please fill in both fields');
            return;
        }

        if (editingPost) {
            // Edit existing post
            editingPost.querySelector('.post-title').textContent = title;
            editingPost.querySelector('.post-description').textContent = description;
        } else {
            // Create new post
            const post = document.createElement('div');
            post.className = 'post';
            post.innerHTML = `
    <div class="post-header">
        <h2 class="post-title">${title}</h2>
    </div>
    <div class="post-body">
        <p class="post-description">${description}
        </p>
    </div>
    <div class="post-footer">
        <button class="edit">Edit</button>
        <button class="dlt">Delete</button>
    </div>
`;
         postContainer.appendChild(post);

            // Add event listeners to new edit and delete buttons
            post.querySelector('.edit').addEventListener('click', () => {
                editingPost = post;
                postForm.querySelector('.title').value = post.querySelector('.post-title').textContent;
                postForm.querySelector('.description').value = post.querySelector('.post-description').textContent;
                contentDiv.style.display = 'flex';
            });

            post.querySelector('.dlt').addEventListener('click', () => {
                postContainer.removeChild(post);
            });

            // Show success message
            postCreatedMessage.style.display = 'block';
            setTimeout(() => {
                postCreatedMessage.style.display = 'none';
            }, 3000);
        }

        contentDiv.style.display = 'none';
    });
});

     