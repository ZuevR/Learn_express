window.onload = function () {
  checkUser();
  fixMenu();

  const logoutLink = document.getElementById('logout-link');
  const usersListArea = document.getElementById('scroll-content');
  logoutLink.addEventListener('click', logout);

  getFollowersInfo()
    .then(users => {
      drawUsersList(usersListArea, users);
    });

};