window.onload = function () {
  checkUser();
  fixMenu();

  const logoutLink = document.getElementById('logout-link');
  logoutLink.addEventListener('click', logout);

  const postsArea = document.getElementById('scroll-content');
  const getAllPosts = () => {
    axios('/posts')
      .then(res => {
        drawPosts(postsArea, res.data);
      })
  };
  getAllPosts();

  const navMenu = document.querySelectorAll('.nav-menu-item');

  navMenu[0].addEventListener('click', getUsersPage);
  navMenu[2].addEventListener('click', getMyPostsPage);
  navMenu[3].addEventListener('click', getFriendsPostsPage);
  navMenu[4].addEventListener('click', getPostAddPage);
};