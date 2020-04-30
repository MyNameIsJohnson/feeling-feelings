console.log(localStorage.getItem('currentUser'));
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
const welcome = document.querySelector('#userProfile');


let logoutBtn;
let userUpdated;


fetch('/api/v1/verify')
	.then((buffer) => buffer.json())
	.then((data) => {
        if (!currentUser) {
            currentUser = data.currentUser;
        };
		console.log(currentUser);
		render(currentUser);
})
	.catch((err) => console.log(err));

const welcomeUser = document.createTextNode(`Welcome, ${currentUser.firstName}`);
welcome.appendChild(welcomeUser);
const logout = () => {
    fetch('/api/v1/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include', 
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.status === 200) {
            window.location='/';
        }
    });

    // Remove currentUser from localStorage
    localStorage.removeItem("currentUser");
};

// Fill user's fields with the information 
function renderData(currentUser) { 
    logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener("click", logout);

    const firstName = document.getElementById('firstName'); 
    const lastName = document.getElementById('lastName'); 
    const email = document.getElementById('email'); 

    firstName.value = currentUser.firstName;
    lastName.value = currentUser.lastName;
    email.value = currentUser.email;
};

// -------------------- Update user profile

const updateProfileBtn = document.getElementById("updateProfile");

updateProfileBtn.addEventListener('click', (event) => {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    userUpdated = {firstName: firstName.value, lastName: lastName.value, email: email.value};

    // Save updated user to localStorage for being able to display changes on front-end
    localStorage.setItem("currentUser", JSON.stringify(userUpdated));
    
    fetch(`/api/v1/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include',
        },
        body: JSON.stringify(userUpdated)
    })
        .then((stream) => stream.json())
        .then((res) => {            
            render(userUpdated);
            showMsg()
        })
    })

const showMsg = () => {
    let form = document.getElementById('profileForm');
    let successUpdate = document.querySelector('.successMsg');
    if (!successUpdate) {
        form.insertAdjacentHTML('beforebegin', `
    <div class="successMsg">
    Your information has been successfully updated.
    </div>
    `);
    };
}

// -------------------------- DELETE USER PROFILE

const deleteUserBtn = document.getElementById("deleteProfile");


deleteUserBtn.addEventListener('click', (event) => {
    let userId = localStorage.getItem('userId');
    fetch(`/api/v1/users/${userId}`, {
        method: 'DELETE',
    })
        .then((stream) => stream.json())
        .then((res) => {
            if (res.status === 200) {
                // cleans local storage of user data
                localStorage.removeItem("currentUser");
                localStorage.removeItem("UserId");
            }
            // grabs the modal and shows it on Delete button click
            $('#deleteUserMsg').show();
        })
        .catch((err) => console.log(err));
})

// sends the user to homescreen when clicking Close on modal
$('#modalClose').on('click', function() {
    window.location='/';
});




