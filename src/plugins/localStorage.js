const localStorage = {};

const getItem = window.localStorage.getItem;

localStorage.getItem = (key) => {
    if (localStorage[key]) return localStorage[key];
    return getItem.call(window.localStorage, key);
};

const setItem = window.localStorage.setItem;
localStorage.setItem = (key, value) => {
    localStorage[key] = value;

    setItem.call(window.localStorage, key, value);
};

export default localStorage;