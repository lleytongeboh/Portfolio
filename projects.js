// Project details supplied by Lleyton. No credentials or private deployment configuration belong here.
const projectDetails = {
  proformax: {
    title: 'ProFormaX',
    label: 'Production platform · Substantial project contributions',
    description: 'Production green-building assessment platform supporting assessment workflows, evidence submission, reviewer verification, certification, role-based administration, recommendations, notifications and AI-assisted guidance.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'REST API', 'OpenAI API', 'Vercel', 'Hostinger', 'Git/GitHub'],
    workHeading: 'My contributions',
    work: [
      'Production frontend and backend deployment, API/frontend integration and deployment maintenance.',
      'Authentication and role-based access flows; assessment, evidence submission and reviewer verification workflows.',
      'Admin and Facilitator Admin features, certificate generation and verification.',
      'Notifications and email-related workflows; OpenAI assistant integration.',
      'Security-related production fixes, testing and debugging.'
    ],
    liveUrl: 'https://myproformax.com',
    screenshots: [
      { src: 'assets/projects/proformax-screenshot.png', alt: 'ProFormaX public sign-in screen, captured from myproformax.com.' }
    ]
  },
  selab: {
    title: 'Selab Management System',
    label: 'Final Year Project',
    description: 'AI-assisted group project management system designed to improve accountability through role-based guidance, task monitoring, progress tracking, reminders and centralised project coordination.',
    technologies: ['React', 'Material UI', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'OpenAI API', 'JWT', 'Docker', 'Docker Compose', 'Nginx', 'REST API', 'Git/GitHub'],
    workHeading: 'Key functionality',
    work: [
      'Leader and Member roles with authentication and authorization.',
      'Role-based AI guidance and an OpenAI-powered AI chatbox.',
      'Task assignment, progress monitoring and member progress reporting.',
      'Deadline and reminder support, group accountability and centralised project information.'
    ],
    accessNotice: 'Live access is restricted because user accounts are manually registered.',
    // No deployment URL was found in this repository. Only add a verified public URL.
    liveUrl: null,
    report: {
      url: 'assets/documents/selab-fyp-final-report.pdf',
      title: 'Personalised Chatbox for Role-Based Guidance and Group Accountability',
      description: 'Final Year Project report by Lleyton Geboh Anak Leslie, 2026. Documents the chatbox implementation within Selab, methodology and evaluation. PDF · 88 pages · 4.5 MB.'
    },
    screenshots: [
      { src: 'assets/projects/selab-screenshot.png', alt: 'Selab project overview and personalised chatbox using demo-labelled accounts — FYP report, Figure 4.3.' },
      { src: 'assets/projects/selab-ai-guidance.png', alt: 'AI-assisted task guidance in the personalised chatbox — FYP report, Figure 4.12.' },
      { src: 'assets/projects/selab-member-view.png', alt: 'Member view with assigned tasks and reminders — FYP report, Figure 4.15.' }
    ]
  }
};

// One native dialog provides focus containment, Escape dismissal and modal semantics.
const projectDialog = document.querySelector('#project-dialog');
let projectTrigger = null;
function openProjectDetails(key, trigger) {
  const project = projectDetails[key];
  if (!project) return;
  projectTrigger = trigger;
  document.querySelector('#project-dialog-title').textContent = project.title;
  document.querySelector('#project-dialog-label').textContent = project.label;
  document.querySelector('#project-dialog-description').textContent = project.description;
  document.querySelector('#project-dialog-work-heading').textContent = project.workHeading;
  const access = document.querySelector('#project-dialog-access');
  access.textContent = project.accessNotice || '';
  access.hidden = !project.accessNotice;
  const technologies = document.querySelector('#project-dialog-technologies');
  technologies.replaceChildren(...project.technologies.map(technology => {
    const tag = document.createElement('span');
    tag.textContent = technology;
    return tag;
  }));
  const work = document.querySelector('#project-dialog-work');
  work.replaceChildren(...project.work.map(contribution => {
    const item = document.createElement('li');
    item.textContent = contribution;
    return item;
  }));
  const gallery = document.querySelector('#project-dialog-gallery');
  gallery.replaceChildren(...project.screenshots.map(screenshot => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = screenshot.src;
    img.alt = screenshot.alt;
    img.loading = 'lazy';
    const caption = document.createElement('figcaption');
    caption.textContent = screenshot.alt;
    figure.append(img, caption);
    return figure;
  }));
  gallery.hidden = project.screenshots.length === 0;
  const report = document.querySelector('#project-dialog-report');
  report.hidden = !project.report;
  const reportLink = report.querySelector('a');
  reportLink.removeAttribute('href');
  report.querySelector('h3').textContent = project.report?.title || '';
  report.querySelector('p').textContent = project.report?.description || '';
  if (project.report) reportLink.href = project.report.url;
  const live = document.querySelector('#project-dialog-live');
  live.hidden = !project.liveUrl;
  live.removeAttribute('href');
  if (project.liveUrl) live.href = project.liveUrl;
  live.textContent = key === 'selab' ? 'Visit Website ↗' : 'Live Website ↗';
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
  document.body.classList.add('project-dialog-open');
}
document.querySelectorAll('[data-project]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => openProjectDetails(button.dataset.project, button));
});
projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...projectDialog.querySelectorAll('button, a[href]')]
    .filter(control => !control.closest('[hidden]') && !control.disabled);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
projectDialog.addEventListener('click', event => {
  const rect = projectDialog.getBoundingClientRect();
  if (event.target === projectDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
    projectDialog.close();
  }
});
projectDialog.addEventListener('close', () => {
  document.body.classList.remove('project-dialog-open');
  projectTrigger?.focus({ preventScroll: true });
});
