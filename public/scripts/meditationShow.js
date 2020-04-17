console.log('meditations Show JS...');
const API_BASE = '/api/v1';
const meditation = document.getElementById('meditation');
const meditationId = window.location.pathname.split('/')[2];
const postForm = document.getElementById('newPost');


function getMeditation() {
  fetch(`${API_BASE}/meditations/${meditationId}`)
  .then((stream) => stream.json())
  .then(res => render(res))
  .catch((err) => console.log(err));
}

getMeditation();


function render(meditationObj) {
  console.log(meditationObj);
  const meditationTemplate = getMeditationTemplate(meditationObj);
  meditation.innerHTML = '';
  meditation.insertAdjacentHTML('beforeend', meditationTemplate);
}


function getMeditationTemplate(meditation) {
  // meditation Posts Template
  const meditationPosts = meditation.posts.map((post) => {
    return `
      <article id="${post._id}" class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">${post.user}</h5>
          <p class="card-text">${post.body}</p>
          <button class="btn btn-sm btn-danger float-right delete-post" type="button">Delete Post</button>
        </div>
      </article>
    `;
  });

  // meditation Template
  return `
    <div id="${meditation._id}" class="col-md-8 offset-md-2">
      <button type="button" class="btn btn-primary float-right mb-3" data-toggle="modal" data-target="#newPostModal">
        Add Post
      </button>
      <img src="${meditation.image}" class="img-fluid" width="100%" />
      <h2>${meditation.name}</h2>
      <p class="mb-5">${meditation.description}</p>
      <section>
      <h4 class="mb-4">Posts:</h4>
        ${meditationPosts}
      </section>
    </div>
  `;
}

// Add New meditation Post
postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const body = document.getElementById('body');
  let formIsValid = false;

  // Select Error Messages
  const titleFeedback = document.querySelector('.title-feedback');
  const bodyFeedback = document.querySelector('.body-feedback');

  // Reset Validation Classes & Errors
  title.classList.remove('is-invalid');
  body.classList.remove('is-invalid');
  titleFeedback && titleFeedback.remove();
  bodyFeedback && bodyFeedback.remove();

  if (!title.value) {
    formIsValid = false;
    title.classList.add('is-invalid');
    title.parentNode.insertAdjacentHTML('beforeend', '<div class="invalid-feedback title-feedback">Title is required</div>');
  } else {
    formIsValid = true;
    title.classList.add('is-valid');
  }
  
  if (!body.value) {
    formIsValid = false;
    body.classList.add('is-invalid');
    body.parentNode.insertAdjacentHTML('beforeend', '<div class="invalid-feedback body-feedback">Content is required</div>');
  } else {
    formIsValid = true;
    body.classList.add('is-valid');
  }

  if (formIsValid) {
    console.log('Let\'s do this!');
    const newPost = {title: title.value, body: body.value};
    console.log(newPost);

    fetch(`/api/v1/meditations/${meditationId}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then((stream) => stream.json())
      .then((res) => {
        console.log(res);
        if (res.title) {
          getMeditation();
          $('#newPostModal').modal('hide');
        }
      })
      .catch((err) => console.log(err));
  }
});


// Delete meditation Post
meditation.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-post')) {
    deletePost(event);
  }
});


function deletePost(event) {
  fetch(`/api/v1/meditations/${meditationId}/posts/${event.target.parentNode.parentNode.id}`, {
    method: 'DELETE',
  })
    .then((stream) => stream.json())
    .then((res) => {
      console.log(res);
      location.reload();
    })
    .catch((err) => console.log(err));
}
