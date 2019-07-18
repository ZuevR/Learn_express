const fixMenu = () => {
  const menuSection = document.getElementById('left-section-wrap');
  const postSection = document.getElementById('posts');
  window.onscroll = () => {
    let menuOffset = menuSection.getBoundingClientRect().top;
    let postOffset = postSection.getBoundingClientRect().top;

    if (menuOffset < 15) {
      menuSection.classList.add('fixed-section');
    }
    if (postOffset >= 15) {
      menuSection.classList.remove('fixed-section');
    }
  };
};

const checkUser = () => {
  const userNameSpan = document.getElementById('user-name'),
    signUpLink = document.getElementById('sign-up-link'),
    signInLink = document.getElementById('sign-in-link'),
    logoutLink = document.getElementById('logout-link');

  const token = localStorage.getItem('token');
  axios.get('/check-user', {
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

const redirectToHomePage = () => window.location.replace('http://localhost:3000');

const logout = event => {
  event.preventDefault();
  localStorage.removeItem('token');
  redirectToHomePage();
};