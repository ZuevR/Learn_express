window.onload = function () {
  checkUser();
  fixMenu();

  const navMenu = document.querySelectorAll('.nav-menu-item');
  const logoutLink = document.getElementById('logout-link');
  const postsArea = document.getElementById('scroll-content');

  logoutLink.addEventListener('click', logout);

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
  navMenu[2].addEventListener('click', getMyPostsPage);
  navMenu[4].addEventListener('click', getPostAddPage);
};