window.onload = function () {
  checkUser();
  fixMenu();

  const logoutLink = document.getElementById('logout-link');
  logoutLink.addEventListener('click', logout);
};