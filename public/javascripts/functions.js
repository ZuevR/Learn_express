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

const getFollowersInfo = () => {
  return axios('/users/followers', {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(res => res.data)
    .catch();
};

const redirectToHomePage = () => window.location.replace('http://localhost:3000');

const redirectToUsersPage = () => window.location.replace('http://localhost:3000/users');

const logout = event => {
  event.preventDefault();
  localStorage.removeItem('token');
  deleteCookie('token');
  redirectToHomePage();
};

const setCookie = (name, value, expires) => {

  const d = new Date();
  d.setTime(d.getTime() + expires * 1000 * 60 * 60);
  expires = d.toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}`;
};

function deleteCookie(name) {
  setCookie(name, "", -1);
}

const toggleFollow = id => {
  const token = localStorage.getItem('token');
  return axios({
    method: 'POST',
    url: '/users/follow',
    headers: {token},
    data: {id}
  })
};

const drawUsersList = (target, data) => {
  const userId = data.userId;
  const usersList = data.payload;

  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }

  const fragment = document.createDocumentFragment();
  usersList.forEach(elem => {
    const div = document.createElement('div');
    div.classList.add('user');

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('user-name');
    nameSpan.textContent = elem.name;

    const heartSpan = document.createElement('span');
    heartSpan.classList.add('follow');

    const icon = document.createElement('i');
    icon.addEventListener('click', () => {
      toggleFollow(elem.id)
        .then(res => {
          if (res.status === 201) {
            icon.classList.remove('icon-heart-empty');
            icon.classList.add('icon-heart')
          }
          if (res.status === 202) {
            icon.classList.remove('icon-heart');
            icon.classList.add('icon-heart-empty');
          }
        });
    });

    elem.follower === userId ?
      icon.classList.add('icon-heart') :
      icon.classList.add('icon-heart-empty');

    heartSpan.appendChild(icon);
    div.appendChild(nameSpan);
    div.appendChild(heartSpan);
    fragment.appendChild(div);
  });

  target.appendChild(fragment);
};

const searchUsers = keyWord => {
  const token = localStorage.getItem('token');
  return axios({
    method: 'POST',
    url: 'users/search',
    headers: { token },
    data: { keyWord }
  });
};
