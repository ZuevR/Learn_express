window.onload = function () {
  let users = null;
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
        users = res.data;
        drawUsersList(usersListArea, res.data)
      });
  });

  getFollowersInfo()
    .then(data => {
      users = data;
      drawUsersList(usersListArea, data);
    });

  const sortDescButton = document.getElementById('up');
  const sortAscButton = document.getElementById('down');

  sortDescButton.addEventListener('click', event => {
    users = {
      ...users,
      payload: users.payload.sort((user_a, user_b) => user_b.name.localeCompare(user_a.name, undefined, { sensitivity: 'accent' }))
    };
    drawUsersList(usersListArea, users);
    event.target.classList.add('active');
    sortAscButton.classList.remove('active');
  });

  sortAscButton.addEventListener('click', event => {
    users = {
      ...users,
      payload: users.payload.sort((user_a, user_b) => user_a.name.localeCompare(user_b.name, undefined, { sensitivity: 'accent' }))
    };
    drawUsersList(usersListArea, users);
    event.target.classList.add('active');
    sortDescButton.classList.remove('active');
  });


  navMenu[1].addEventListener('click', redirectToHomePage);
  navMenu[2].addEventListener('click', getMyPostsPage);
  navMenu[3].addEventListener('click', getFriendsPostsPage);
  navMenu[4].addEventListener('click', redirectToAddPostPage);
};