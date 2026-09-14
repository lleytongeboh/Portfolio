const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.dataset.open = String(open);
  const menuIcon = menuButton.querySelector('i');
  menuIcon.classList.toggle('fa-bars', !open);
  menuIcon.classList.toggle('fa-xmark', open);
}
setMenu(false);
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('click', event => {
  if (menuButton.getAttribute('aria-expanded') === 'true' && !event.target.closest('header')) {
    setMenu(false);
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 760 && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
const tabs = [...document.querySelectorAll('[role="tab"]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function selectTab(tab) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    item.classList.toggle('active-link', selected);
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    panel.classList.toggle('active-tab', selected);
    panel.setAttribute('aria-hidden', String(!selected));
    if (selected && !reducedMotion.matches) {
      panel.classList.remove('tab-panel-enter');
      void panel.offsetWidth;
      panel.classList.add('tab-panel-enter');
    }
  });
}
selectTab(tabs[0]);
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    }
  });
});
const roles = ['Full-Stack Developer', 'Web Developer', 'Software Developer', 'AI Integration Developer'];
let roleIndex = 0;
let characterIndex = roles[0].length;
let deletingRole = true;
const roleText = document.querySelector('.first-text');
function animateRole() {
  if (reducedMotion.matches) {
    roleText.textContent = roles[0];
    return;
  }
  if (document.hidden) {
    setTimeout(animateRole, 500);
    return;
  }
  const currentRole = roles[roleIndex];
  characterIndex += deletingRole ? -1 : 1;
  roleText.textContent = currentRole.slice(0, characterIndex);
  if (!deletingRole && characterIndex === currentRole.length) {
    deletingRole = true;
    setTimeout(animateRole, 1600);
  } else if (deletingRole && characterIndex === 0) {
    deletingRole = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(animateRole, 320);
  } else {
    setTimeout(animateRole, deletingRole ? 45 : 85);
  }
}
setTimeout(animateRole, 1600);
