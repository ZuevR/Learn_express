const fixMenu = () => {
  const menuSection = document.getElementById('left-section-wrap');
  const scrollSection = document.getElementById('scroll-content');
  const searchSection = document.getElementById('search-bar');

  window.onscroll = () => {
    let menuOffset = menuSection.getBoundingClientRect().top;
    let scrollOffset = scrollSection.getBoundingClientRect().top;

    if (menuOffset < 15) {
      menuSection.classList.add('fixed-section');
      searchSection ? searchSection.classList.add('fixed-section') : false;
    }
    if (scrollOffset >= 15) {
      menuSection.classList.remove('fixed-section');
      searchSection ? searchSection.classList.remove('fixed-section') : false;
    }
  };
};

const checkUser = () => {
  const userNameSpan = document.getElementById('user-name'),
    signUpLink = document.getElementById('sign-up-link'),
    signInLink = document.getElementById('sign-in-link'),
    logoutLink = document.getElementById('logout-link');

  const token = localStorage.getItem('token');
  axios('/check-user', {
    headers: {token}
  })
    .then(res => {
      userNameSpan.textContent = res.data;
      logoutLink.classList.remove('hidden');
      logoutLink.textContent = `Logout (${res.data})`;
    })
    .catch(error => {
      userNameSpan.textContent = 'Guest';
      signUpLink.classList.remove('hidden');
      signInLink.classList.remove('hidden');
    })
};

getFollowersInfo = () => {
  axios('/users/followers', {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(res => console.log(res))
    .catch();
};

const redirectToHomePage = () => window.location.replace('http://localhost:3000');
const redirectToUsersPage = () => window.location.replace('http://localhost:3000/users');
const logout = event => {
  event.preventDefault();
  localStorage.removeItem('token');
  document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  redirectToHomePage();
};

