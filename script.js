const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.dataset.open = String(open);
  menuButton.querySelector('span').textContent = open ? '−' : '+';
}
setMenu(false);
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
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
    panel.hidden = !selected;
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
setInterval(() => {
  if (!reducedMotion.matches && !document.hidden) {
    roleIndex = (roleIndex + 1) % roles.length;
    document.querySelector('.first-text').textContent = roles[roleIndex];
  }
}, 4000);
const form = document.forms['submit-to-google-sheet'];
const status = document.querySelector('#form-status');
const submitButton = form.querySelector('button[type="submit"]');
const scriptURL = 'https://script.google.com/macros/s/AKfycbyGpM-x8Gno8qxSvSfM0VdbZ9FCqYgNWG4ULmQuwi7vHXHQ71dReXzu9WN98Sq9iYnR/exec';
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitButton.disabled) return;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  status.textContent = 'Sending your message…';
  status.dataset.state = 'pending';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form), signal: controller.signal });
    if (!response.ok) throw new Error('Request failed');
    const result = await response.json();
    if (result.result !== 'success') throw new Error('Delivery not confirmed');
    status.textContent = 'Thanks! Your message has been sent.';
    status.dataset.state = 'success';
    form.reset();
  } catch {
    status.textContent = "I couldn't confirm delivery. Please email lleytongeboh18@gmail.com directly. Your message is still here to copy.";
    status.dataset.state = 'error';
  } finally {
    clearTimeout(timeout);
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
  }
});
