window.onload = () => {
  const submitButton = document.getElementById('sign-up');
  const errorField = document.getElementById('error');

  const showError = message => errorField.textContent = message;
  const showSuccess = () => {
    errorField.textContent = 'You have been successfully registered. Redirect to Home after 3 second';
    errorField.classList.add('success');
  };
  const redirectToHomePage = () => window.location.replace('http://localhost:3000');

  /**
   *  Handling Sign Up action
   */
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const form = document.forms['sign-up-form'];
    const formData = {
      name: form.elements['name'].value,
      email: form.elements['email'].value,
      password: form.elements['password'].value
    };

    axios.post('/sign-up', formData)
      .then(res => {
        showSuccess();
        return res;
      })
      .then(res => {
        console.log(res);
        const token = res.data.payload.token;
        localStorage.setItem('token', token);
        setTimeout(redirectToHomePage, 3000);
      })
      .catch(err => {
        const errorText = err.response.data.errorMessage;
        showError(errorText);
      })
  })
};