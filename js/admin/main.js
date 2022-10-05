'use strict';
var gSwitchDisplay = 'table';

function onInit() {
    renderUsers();
}

function renderUsers() {
    const users = getUsersToShow();
    // display table
    const tableHeaderHTML = `
        
            <tr>
                <th>userName</th>
                <th>password</th>
                <th>lastLoginTime</th>
                <th>isAdmin</th>
            </tr>    
    `;
    const strHTML = users.map(
        (user) => `
            <tr>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td>${new Date(user.lastLoginTime).toLocaleString()}</td>
                <td>${user.isAdmin}</td>
            </tr>    
        `
    );
    const tableStrHTML =
        '<table>' + tableHeaderHTML + strHTML.join('') + '</table>';
    // display cards
    const cardsStrHTML = users
        .map(
            (user) => `
             <div class="${user.username}">
                   <p>${user.username}</p>
                   <img src="./images/${user.username}.png" alt="${user.username}" />
             </div>        
        `
        )
        .join('');
    document.querySelector('.users-container').innerHTML =
        gSwitchDisplay === 'table' ? tableStrHTML : cardsStrHTML;
}

function onSetSort(sortBy) {
    setSort(sortBy);
    console.log(sortBy);
    renderUsers();
}

function onSwitchDisplay(elBtn) {
    if (elBtn.classList.contains('selected')) return;
    document
        .querySelectorAll('.switch-container i')
        .forEach((btn) => btn.classList.toggle('selected'));
    gSwitchDisplay = elBtn.id;
    renderUsers();
}
