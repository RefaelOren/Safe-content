'use strict';

const STORAGE_KEY = 'usersDB';
var gUsers;
var gSortBy;

_createUsers();

function getUsersToShow() {
    var users = gUsers;
    users =
        !gSortBy || gSortBy === 'no-sort'
            ? loadFromStorage(STORAGE_KEY)
            : _sortUsers(users, gSortBy);
    return users;
}

function doLogin(userName, password) {
    const currUser = gUsers.find((user) => user.username === userName);
    if (!currUser || currUser.password !== password) return null;
    currUser.lastLoginTime = Date.now();
    _saveUsersToStorage();
    return currUser;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function _createUsers() {
    var users = loadFromStorage(STORAGE_KEY);

    if (!users || !users.length) {
        users = [
            {
                id: _makeId(),
                username: 'rafi',
                password: 'rafi1502',
                lastLoginTime: 1601891998864,
                isAdmin: true,
            },
            {
                id: _makeId(),
                username: 'einat',
                password: 'raflove81',
                lastLoginTime: 1601891978864,
                isAdmin: false,
            },
            {
                id: _makeId(),
                username: 'guli',
                password: 'dog',
                lastLoginTime: 1601891994864,
                isAdmin: false,
            },
        ];
    }
    gUsers = users;
    _saveUsersToStorage();
}

function _saveUsersToStorage() {
    saveToStorage(STORAGE_KEY, gUsers);
}

function _sortUsers(users, sortBy) {
    switch (sortBy) {
        case 'name':
            return users.sort((a, b) => (a.username > b.username ? 1 : -1));
        case 'last-login':
            return users.sort((a, b) =>
                a.lastLoginTime > b.lastLoginTime ? -1 : 1
            );
    }
}

function _makeId(length = 5) {
    var txt = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}
