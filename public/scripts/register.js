console.log('Register JS...');
const form = document.getElementById('registerForm');

form.addEventListener('submit', handleSignupSubmit);

function handleSignupSubmit(event) {
  let formIsValid = true;
  const userData = {};
  event.preventDefault();

  document.querySelectorAll('.invalid-feedback').forEach((alert) => alert.remove());

  const formInputs = [...form.elements];
  formInputs.forEach((input) => {
    input.classList.remove('is-invalid');
    if (input.type !== 'submit' && input.value === '') {
      formIsValid = false;
      input.classList.add('is-invalid');
      input.insertAdjacentHTML('afterend', `
        <div class="invalid-feedback ${input.id}-message">
          Please enter your ${input.name}
        </div>
      `);
    } else if (input.type === 'password' && input.value.length < 4) {
        formIsValid = false;
        input.classList.add('is-invalid');
        input.insertAdjacentHTML('afterend', `
          <div class="invalid-feedback ${input.id}-message">
            Password must be at least 4 characters
          </div>
        `);
    }

    if (formIsValid) {
      userData[input.name] = input.value;
    }
  });

  if (formIsValid) {
    console.log('Submitting User Data ---->', userData)
    fetch('/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },    
        status: 400,
        message: 'Email has already been registered, please try again',
    
      body: JSON.stringify(userData),
      
    })
      .then((res) => res.json())
      .then((data) => { 
        window.location = '/login'; 
        console.log(data);
      })
      .catch((err) => alert('Email has already been registered, please Signup with a different email or login'));
      window.location = '/register'; 
  }
}
