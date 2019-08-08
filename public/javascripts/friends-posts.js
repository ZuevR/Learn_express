window.onload = function () {
  checkUser();
  fixMenu();

  const navMenu = document.querySelectorAll('.nav-menu-item');
  const logoutLink = document.getElementById('logout-link');
  const postsArea = document.getElementById('scroll-content');


  logoutLink.addEventListener('click', logout);

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

  const getFriendsPosts = () => {
    const token = localStorage.getItem('token');
    axios({
      method: 'GET',
      url: '/posts/friends-posts',
      headers: {token}
    }).then(res => {
      drawPosts(postsArea, res.data);
    })
  };
  getFriendsPosts();

  navMenu[0].addEventListener('click', getUsersPage);
  navMenu[1].addEventListener('click', redirectToHomePage);
};