window.onload = function () {
  let posts = null;
  checkUser();
  fixMenu();

  const logoutLink = document.getElementById('logout-link');
  logoutLink.addEventListener('click', logout);

  const postsArea = document.getElementById('scroll-content');
  const getAllPosts = () => {
    axios('/api/v1/posts')
      .then(res => {
        posts = res.data;
        drawPosts(postsArea, res.data);
      })
  };
  getAllPosts();

  const sortBlock = document.getElementById('icons');
  sortBlock.addEventListener('click',function(event) {
    if (event.target.id === 'up') {
      drawPosts(postsArea, getDescSort(posts));
      this.children[0].classList.add('active');
      this.children[1].classList.remove('active');
    }
    if (event.target.id === 'down') {
      drawPosts(postsArea, getAscSort(posts));
      this.children[0].classList.remove('active');
      this.children[1].classList.add('active');
    }
  });

  const navMenu = document.querySelectorAll('.nav-menu-item');

  navMenu[0].addEventListener('click', getUsersPage);
  navMenu[2].addEventListener('click', getMyPostsPage);
  navMenu[3].addEventListener('click', getFriendsPostsPage);
  navMenu[4].addEventListener('click', getPostAddPage);
};