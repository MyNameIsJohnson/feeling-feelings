const cityElement = document.getElementById('city');

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
    const meditationTabs = meditationsArr.map((meditation) => {
      return getMeditationTabs(meditation);
    }).join('');    
  
    meditationUL.insertAdjacentHTML('beforeend', meditationTemplates);
    
    meditationTab.insertAdjacentHTML('beforeend', meditationTabs);
    
  }


  function getMeditationTemplate(meditation) {
    return `
        <li class="nav-item"><a data-toggle="tab" href="#${meditation.name}" class="btn tab ">${meditation.name}
        </a>
    `;   
  }
  function getMeditationTabs(meditation) {
    return `
      <div id="${meditation.name}" class="tab-pane fade ">
        <div class="card-body">
          <h2 class="meditation-name">${meditation.name}</h2>
        </div>
        <img src="${meditation.image}" class="card-img-top idx-img" alt="${meditation.name}" />
          <h3 class="card-text">
          ${meditation.description}
          (${meditation.posts.length} ${meditation.posts.length === 1 ? 'post' : 'posts'})
        </h3>
        <a href="/meditations/${meditation._id}" class="btn btn-primary float-right">See reviews</a>      
      </div>
    `;
  }
