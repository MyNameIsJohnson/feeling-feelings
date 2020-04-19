console.log('Index meditation ...');
const meditationUL = document.getElementById('meditationUL');
const meditationTab = document.getElementById('meditationTab');

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
        <img src="${meditation.image}" class="card-img-top" alt="${meditation.name}" />
      </div>
  `;
}

meditationUL.addEventListener('click', (event) => {
  event.preventDefault();
  let meditationWelcome = document.getElementById('meditation-welcome');
  meditationWelcome.parentNode.removeChild(meditationWelcome) 
});
