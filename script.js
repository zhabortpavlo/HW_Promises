function fetchPost(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function fetchPostComments(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function clearPostContainer() {
    const postContainer = document.getElementById('postContainer');
    while (postContainer.firstChild) {
        postContainer.removeChild(postContainer.firstChild);
    }
}

function searchPost() {
    const postId = document.getElementById('postId').value;
    if (postId < 1 || postId > 100) {
        alert("Please enter a valid ID between 1 and 100.");
        return;
    }

    fetchPost(postId)
        .then(post => {
            clearPostContainer();

            const postContainer = document.getElementById('postContainer');
            const postHeader = document.createElement('h2');
            postHeader.textContent = 'Post';
            postContainer.appendChild(postHeader);

            const postInfo = document.createElement('div');
            const postIdLabel = document.createElement('strong');
            postIdLabel.textContent = 'ID:';
            const postIdValue = document.createElement('span');
            postIdValue.textContent = post.id;
            const titleLabel = document.createElement('strong');
            titleLabel.textContent = 'Title:';
            const titleValue = document.createElement('span');
            titleValue.textContent = post.title;
            const bodyLabel = document.createElement('strong');
            bodyLabel.textContent = 'Body:';
            const bodyValue = document.createElement('span');
            bodyValue.textContent = post.body;

            postInfo.appendChild(postIdLabel);
            postInfo.appendChild(postIdValue);
            postInfo.appendChild(document.createElement('br'));
            postInfo.appendChild(titleLabel);
            postInfo.appendChild(titleValue);
            postInfo.appendChild(document.createElement('br'));
            postInfo.appendChild(bodyLabel);
            postInfo.appendChild(bodyValue);

            const commentsButton = document.createElement('button');
            commentsButton.textContent = 'Get Comments';
            commentsButton.addEventListener('click', () => {
                displayComments(post.id);
            });

            postContainer.appendChild(postInfo);
            postContainer.appendChild(commentsButton);
        })
        .catch(error => {
            console.error('There was a problem with fetching the post:', error);
            alert('There was a problem fetching the post. Please try again.');
        });
}

function displayComments(postId) {
    fetchPostComments(postId)
        .then(comments => {
            const postContainer = document.getElementById('postContainer');
            const commentsList = document.createElement('ul');
            comments.forEach(comment => {
                const commentItem = document.createElement('li');
                const nameStrong = document.createElement('strong');
                nameStrong.textContent = 'Name:';
                const nameSpan = document.createElement('span');
                nameSpan.textContent = comment.name;
                const emailStrong = document.createElement('strong');
                emailStrong.textContent = 'Email:';
                const emailSpan = document.createElement('span');
                emailSpan.textContent = comment.email;
                const bodyStrong = document.createElement('strong');
                bodyStrong.textContent = 'Body:';
                const bodySpan = document.createElement('span');
                bodySpan.textContent = comment.body;
                
                commentItem.appendChild(nameStrong);
                commentItem.appendChild(nameSpan);
                commentItem.appendChild(document.createElement('br'));
                commentItem.appendChild(emailStrong);
                commentItem.appendChild(emailSpan);
                commentItem.appendChild(document.createElement('br'));
                commentItem.appendChild(bodyStrong);
                commentItem.appendChild(bodySpan);

                commentsList.appendChild(commentItem);
            });
            postContainer.appendChild(commentsList);
        })
        .catch(error => {
            console.error('There was a problem with fetching the comments:', error);
            alert('There was a problem fetching the comments. Please try again.');
        });
}