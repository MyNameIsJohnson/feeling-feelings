console.log('Index meditation ...');
const meditationElement = document.getElementById('meditation');

fetch('/api/v1/meditations')
  .then((buffer) => buffer.json())
  .then((data) => {
    console.log(data);
    render(data);
  })
  .catch((err) => console.log(err));


function render(meditationsArr) {
  const meditationTemplates = meditationsArr.map((meditation) => {
    return getMeditationTemplate(meditation);
  }).join('');

  meditationElement.insertAdjacentHTML('beforeend', meditationTemplates);
}


function getMeditationTemplate(meditation) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${meditation.image}" class="card-img-top" alt="${meditation.name}" />
        <div class="card-body">
          <h5 class="card-title">${meditation.name}</h5>
          <p class="card-text">
            ${meditation.description}
            (${meditation.posts.length} ${meditation.posts.length === 1 ? 'post' : 'posts'})
          </p>
          <a href="/meditations/${meditation._id}" class="btn btn-primary float-right">View Details</a>
        </div>
      </div>
    </div>
  `;
}
