window.onload = () => {
  const submitButton = document.getElementById('sign-in');
  const errorField = document.getElementById('error');

  const showError = message => errorField.textContent = message;

  /**
   *  Handling Sign Up action
   */
  submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const form = document.forms['sign-up-form'];
    const formData = {
      email: form.elements['email'].value,
      password: form.elements['password'].value
    };

    axios.post('/sign-in', formData)
      .then(res => {
        console.log(res);
        const token = res.data.payload.token;
        localStorage.setItem('token', token);
        redirectToHomePage();
      })
      .catch(err => {
        const errorText = err.response.data.errorMessage;
        showError(errorText);
      })
  })
};