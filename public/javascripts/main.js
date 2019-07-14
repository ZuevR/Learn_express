window.onload = function () {
  const submitButton = document.getElementById('sign-up');

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const form = document.forms['sign-up-form'];
    const formData = {
      name: form.elements['name'].value,
      email: form.elements['email'].value,
      password: form.elements['password'].value
    };

    // console.log(formData);

    axios.post('/sign-up', formData)
        .then((res) => console.log(res));
  })
};