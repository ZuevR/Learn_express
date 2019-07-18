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

window.onload = function () {

};