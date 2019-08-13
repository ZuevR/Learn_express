window.onload = function () {
  checkUser();
  fixMenu();

  const logoutLink = document.getElementById('logout-link');
  logoutLink.addEventListener('click', logout);

  const postsArea = document.getElementById('scroll-content');
  drawAllPosts(postsArea);

  const navMenu = document.querySelectorAll('.nav-menu-item');


  navMenu[0].addEventListener('click', getUsersPage);
  navMenu[2].addEventListener('click', getFriendsPostsPage);
  navMenu[3].addEventListener('click', getPostAddPage);
};