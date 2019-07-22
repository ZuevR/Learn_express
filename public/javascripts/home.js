window.onload = function () {
  checkUser();
  fixMenu();

  const logoutLink = document.getElementById('logout-link');
  logoutLink.addEventListener('click', logout);


  const navMenu = document.querySelectorAll('.nav-menu-item');

  const getUsersPage = () => {
    const token = localStorage.getItem('token');

    axios('/users', {
      headers: {token}
    })
      .then(res => {
        redirectToUsersPage();
      })
      .catch(err => {
        const errorText = err.response.data.errorMessage;
        const errorsArea = document.getElementById('errors');
        errorsArea.textContent = errorText;
        errorsArea.classList.remove('hidden');
      });
  };

  navMenu[0].addEventListener('click', getUsersPage);
};