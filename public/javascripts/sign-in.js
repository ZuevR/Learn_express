window.onload = () => {
  const submitButton = document.getElementById('sign-in');
  const errorField = document.getElementById('error');

  const showError = message => errorField.textContent = message;

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const form = document.forms['sign-up-form'];
    const formData = {
      email: form.elements['email'].value,
      password: form.elements['password'].value
    };

    axios.post('/api/v1/auth/sign-in', formData)
      .then(res => {
        const token = res.data.payload.token;
        localStorage.setItem('token', token);
        setCookie('token', token, 24);
        redirectToHomePage();
      })
      .catch(err => {
        const errorText = err.response.data.message;
        showError(errorText);
      })
  })
};