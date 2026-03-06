
import '../css/api.css';
import '../src/style.css';
import { fetchData } from './fetch.js';

console.log('Moi luodaan nyt tokeneita ja kirjaudutaan sisään');


const registerUser = async (event) => {
    event.preventDefault();

    // Haetaan oikea formi
    const registerForm = document.querySelector('.registerForm');

    // Haetaan formista arvot
    const username = registerForm.querySelector('#username').value.trim();
    const password = registerForm.querySelector('#password').value.trim();
    const email = registerForm.querySelector('#email').value.trim();

    /* FRONTEND rekisteröinnin validointi */

    // Username: 3–20 merkkiä, vain kirjaimet ja numerot
    if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
        alert("Käyttäjänimen tulee olla 3–20 merkkiä ja sisältää vain kirjaimia ja numeroita.");
        return;
    }

    // Password: vähintään 8 merkkiä, max 30
    if (password.length < 8 || password.length > 30) {
        alert("Salasanan tulee olla vähintään 8 merkkiä.");
        return;
    }

    // Email: validi muoto
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Sähköpostiosoite ei ole kelvollinen.");
        return;
    }

    // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
    const bodyData = {
        username: username,
        password: password,
        email: email,
    };

    // Endpoint
    const url = 'http://localhost:3000/api/users';

    // Options
    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    };
    console.log(options);

    // Hae data
    const response = await fetchData(url, options);

    if (response.error) {
        console.error('Error adding a new user:', response.error);
        return;
    }

    if (response.message) {
        console.log(response.message, 'success');
    }

    console.log(response);
    registerForm.reset(); // tyhjennetään formi
};

const loginUser = async (event) => {
    event.preventDefault();

    // Haetaan oikea formi
    const loginForm = document.querySelector('.loginForm');

    // Haetaan formista arvot
    const username = loginForm.querySelector('input[name=username]').value.trim();
    const password = loginForm.querySelector('input[name=password]').value.trim();

    /* FRONTEND kirjautumisen validointi */

    // Username ei voi olla tyhjä
    if (username.length === 0) {
        alert("Käyttäjätunnus vaaditaan.");
        return;
    }

    // Password ei voi olla tyhjä
    if (password.length === 0) {
        alert("Salasana vaaditaan.");
        return;
    }

    // Username minimi 3 merkkiä
    if (username.length < 3) {
        alert("Käyttäjätunnuksen tulee olla vähintään 3 merkkiä.");
        return;
    }

    // Password minimi 8 merkkiä (backendin vaatimus)
    if (password.length < 8) {
        alert("Salasanan tulee olla vähintään 8 merkkiä pitkä.");
        return;
    }

    // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
    const bodyData = {
        username: username,
        password: password,
    };

    // Endpoint
    const url = 'http://localhost:3000/api/users/login';

    // Options
    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    };
    console.log(options);

    // Hae data
    const response = await fetchData(url, options);

    if (response.error) {
        console.error('Error login in:', response.error);
        alert("Virhe kirjautumisessa: Tarkista käyttäjätunnus ja salasana.");
        return;
    }

    if (response.message) {
        console.log(response.message, 'success');
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.user.username);
        logResponse('loginResponse', `localStorage set with token value: ${response.token}`);
        setTimeout(function () {
            // window.location.href = 'users.html';
        }, 3000);
    }

    console.log(response);
    loginForm.reset(); // tyhjennetään formi
};

const checkUser = async (event) => {
    const url = 'http://localhost:3000/api/users/me';
    let headers = {};
    let token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        headers = { Authorization: `Bearer ${token}` };
    }
    const options = {
        headers: headers,
    };

    const response = await fetchData(url, options);

    if (response.error) {
        console.error('Error login in:', response.error);
        return;
    }

    if (response.message) {
        console.log(response.message, 'success');
        logResponse('meResponse', `Authorized user info: ${JSON.stringify(response)}`);
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 3000);
    }

    console.log(response);
    loginForm.reset(); // tyhjennetään formi
};

const deleteUser = async (event) => {
    console.log(event);
    console.log(event.target);
    console.log(event.target.attributes['data-id'].value);
    const id = event.target.attributes['data-id'].value;
    const url = `http://localhost:3000/api/users/${id}`;
    const options = { method: 'DELETE' };

    const answer = confirm(`Are you sure you want to delete user with ID: ${id}`);
    if (answer) {
        try {
            const response = await fetch(url, options);
            console.log(response);
            getAllUsers();
        } catch (error) {
            console.error(error);
        }
    }
};

function clearLocalStorage() {
    localStorage.removeItem('token');
    logResponse('clearResponse', 'localStorage cleared!');
}

function logResponse(codeblock, text) {
    document.getElementById(codeblock).innerText = text;
}

const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);

const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', loginUser);

const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', checkUser);

const clear = document.querySelector('#clearButton');
clear.addEventListener('click', clearLocalStorage);
