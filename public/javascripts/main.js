const axios = require('axios');

window.onload = function () {
  const submitButton = document.getElementById('sign-up');
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(axios);
  })
};