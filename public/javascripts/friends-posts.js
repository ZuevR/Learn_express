window.onload = function () {
  let posts = null;
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
      url: '/api/v1/posts/friends',
      headers: {token}
    }).then(res => {
      posts = res.data;
      drawPosts(postsArea, res.data);
    })
  };
  getFriendsPosts();

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

  navMenu[0].addEventListener('click', getUsersPage);
  navMenu[1].addEventListener('click', redirectToHomePage);
  navMenu[2].addEventListener('click', getMyPostsPage);
  navMenu[4].addEventListener('click', getPostAddPage);
};