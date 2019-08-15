window.onload = function () {
  checkUser();
  fixMenu();

  const logoutLink = document.getElementById('logout-link');
  const navMenu = document.querySelectorAll('.nav-menu-item');
  const postTitle = document.getElementById('title');
  const postText = document.getElementById('text');
  const addButton = document.getElementById('add-post');

  addButton.addEventListener('click', event => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const title = postTitle.value;
    const text = postText.value;
    axios({
      method: 'POST',
      headers: { token },
      url: '/api/v1/posts/create',
      data: {
        title,
        text
      },
    }).then(res => {
      redirectToHomePage();
    })
  });

  logoutLink.addEventListener('click', logout);

  navMenu[0].addEventListener('click', getUsersPage);
  navMenu[1].addEventListener('click', redirectToHomePage);
  navMenu[2].addEventListener('click', getMyPostsPage);
  navMenu[3].addEventListener('click', getFriendsPostsPage);
};