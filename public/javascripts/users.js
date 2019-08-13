window.onload = function () {
  checkUser();
  fixMenu();

  const logoutLink = document.getElementById('logout-link');
  const usersListArea = document.getElementById('scroll-content');
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search');
  const navMenu = document.querySelectorAll('.nav-menu-item');

  logoutLink.addEventListener('click', logout);
  searchButton.addEventListener('click', () => {
    let keyWord = searchInput.value;
    searchUsers(keyWord)
      .then(res => {
        drawUsersList(usersListArea, res.data)
      });
  });

  getFollowersInfo()
    .then(data => {
      drawUsersList(usersListArea, data);
    });

  navMenu[1].addEventListener('click', redirectToHomePage);
  navMenu[2].addEventListener('click', getMyPostsPage);
  navMenu[3].addEventListener('click', getFriendsPostsPage);
  navMenu[4].addEventListener('click', redirectToAddPostPage);
};