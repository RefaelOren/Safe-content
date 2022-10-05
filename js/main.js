'use strict';

function onLogin(ev) {
    ev.preventDefault();
    const elUsername = document.querySelector('[name=username]');
    const userName = elUsername.value;
    const elPassword = document.querySelector('[name=password]');
    const password = elPassword.value;
    if (!userName || !password) return;
    console.log('hey');
    const user = doLogin(userName, password);
    if (!user) showUserAlert();
    else showUserSecretContent(user);
}

function showUserAlert() {
    alert('Invalid username/password');
}

function showUserSecretContent(user) {
    console.log('you are in');
    document.querySelector('.user-content').style.display = 'block';
    document.querySelector('h1 span').innerText = user.username;
    if (user.isAdmin)
        document.querySelector('.admin-btn').style.visibility = 'visible';
}

function onLogOut() {
    document.querySelector('.user-content').style.display = 'none';
    const elUsername = document.querySelector('[name=username]');
    elUsername.value = '';
    const elPassword = document.querySelector('[name=password]');
    elPassword.value = '';
}
