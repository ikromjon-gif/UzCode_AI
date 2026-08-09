const body = document.body;
const sidebar = document.getElementById('sidebar');
const searchModal = document.getElementById('searchModal');
const projectModal = document.getElementById('projectModal');
const toast = document.getElementById('toast');
let toastTimer;

const translations = {
  uz: { navOverview: 'Bosh sahifa', navWorkspace: 'Ish maydoni', navAgents: 'AI agentlar', navProjects: 'Loyihalar', navArchitecture: 'Arxitektura', navEditor: 'Kod muharriri', navDeploy: 'Deploylar', navAnalytics: 'Analitika', navSettings: 'Sozlamalar', search: 'Qidirish...', newProject: '+ Yangi loyiha', heroTitle: 'Katta g‘oyalarni yarating.<br /><em>Ishonch</em> bilan jo‘nating.', heroCopy: 'AI agentlar, aqlli ish maydoni va real-vaqt deploy orqali dasturiy mahsulotlarni tezroq yarating.', startBuilding: 'Boshlash <span>→</span>', watchOverview: 'Sharhni ko‘rish <span>▷</span>', statProjects: 'Faol loyihalar', statProjectsChange: '↗ Bu oy 12%', statGenerations: 'AI generatsiyalar', statGenerationsChange: '↗ Bu hafta 23%', statDeployments: '12 ta productionda', statCredits: 'Qolgan kreditlar', statCreditsChange: '18 kunda yangilanadi', yourWorkspace: 'SIZNING ISH MAYDONINGIZ', continueBuilding: 'Yaratishni davom ettiring', viewProjects: 'Barcha loyihalar →', workspaceTitle: 'G‘oyadan amalga oshirishgacha', agentsOnline: '● 12 agent onlayn' },
  en: { navOverview: 'Overview', navWorkspace: 'Workspace', navAgents: 'AI agents', navProjects: 'Projects', navArchitecture: 'Architecture', navEditor: 'Code editor', navDeploy: 'Deployments', navAnalytics: 'Analytics', navSettings: 'Settings', search: 'Search anything...', newProject: '+ New project', heroTitle: 'Build bold ideas.<br /><em>Ship</em> with confidence.', heroCopy: 'Build software products faster with AI agents, a smart workspace and real-time deployments.', startBuilding: 'Start building <span>→</span>', watchOverview: 'Watch overview <span>▷</span>', statProjects: 'Active projects', statProjectsChange: '↗ 12% this month', statGenerations: 'AI generations', statGenerationsChange: '↗ 23% this week', statDeployments: '12 in production', statCredits: 'Credits remaining', statCreditsChange: 'Renews in 18 days', yourWorkspace: 'YOUR WORKSPACE', continueBuilding: 'Continue building', viewProjects: 'View all projects →', workspaceTitle: 'From intent to implementation', agentsOnline: '● 12 agents online' },
  ru: { navOverview: 'Обзор', navWorkspace: 'Рабочее пространство', navAgents: 'AI-агенты', navProjects: 'Проекты', navArchitecture: 'Архитектура', navEditor: 'Редактор кода', navDeploy: 'Деплои', navAnalytics: 'Аналитика', navSettings: 'Настройки', search: 'Поиск...', newProject: '+ Новый проект', heroTitle: 'Создавайте смелые идеи.<br /><em>Запускайте</em> уверенно.', heroCopy: 'Создавайте программные продукты быстрее с AI-агентами, умным рабочим пространством и деплоем в реальном времени.', startBuilding: 'Начать работу <span>→</span>', watchOverview: 'Смотреть обзор <span>▷</span>', statProjects: 'Активные проекты', statProjectsChange: '↗ 12% в этом месяце', statGenerations: 'AI-генерации', statGenerationsChange: '↗ 23% на этой неделе', statDeployments: '12 в production', statCredits: 'Остаток кредитов', statCreditsChange: 'Обновление через 18 дней', yourWorkspace: 'ВАШЕ РАБОЧЕЕ ПРОСТРАНСТВО', continueBuilding: 'Продолжайте создавать', viewProjects: 'Все проекты →', workspaceTitle: 'От идеи до реализации', agentsOnline: '● 12 агентов онлайн' }
};
const setLanguage = (language) => {
  const dictionary = translations[language];
  if (!dictionary) return;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.innerHTML = dictionary[element.dataset.i18n] || element.innerHTML; });
  document.querySelectorAll('[data-lang]').forEach((button) => button.classList.toggle('active', button.dataset.lang === language));
  try { localStorage.setItem('uzcode-language', language); } catch (_) { /* Storage can be unavailable in local previews. */ }
};
let initialLanguage = 'uz';
try { initialLanguage = localStorage.getItem('uzcode-language') || 'uz'; } catch (_) { /* Keep Uzbek as the default. */ }
setLanguage(initialLanguage);
document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
};
const openModal = (modal) => modal.classList.add('show');
const closeModal = (modal) => modal.classList.remove('show');

document.getElementById('menuButton').addEventListener('click', () => sidebar.classList.toggle('open'));
document.getElementById('themeToggle').addEventListener('click', () => {
  body.classList.toggle('light');
  showToast(body.classList.contains('light') ? 'Light mode enabled' : 'Dark mode enabled');
});
document.getElementById('searchButton').addEventListener('click', () => openModal(searchModal));
document.querySelectorAll('.new-project-trigger').forEach((button) => button.addEventListener('click', () => openModal(projectModal)));
document.querySelector('.modal-close').addEventListener('click', () => closeModal(projectModal));

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openModal(searchModal); }
  if (event.key === 'Escape') { closeModal(searchModal); closeModal(projectModal); }
});
[searchModal, projectModal].forEach((modal) => modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal); }));

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', (event) => {
  document.querySelector('.nav a.active')?.classList.remove('active');
  link.classList.add('active');
  sidebar.classList.remove('open');
  if (link.getAttribute('href').startsWith('#') && !document.querySelector(link.getAttribute('href'))) {
    event.preventDefault();
    showToast(`${link.textContent.trim()} module is ready to configure`);
  }
}));

document.querySelectorAll('.command-modal button').forEach((button, index) => button.addEventListener('click', () => {
  closeModal(searchModal);
  if (index === 0) document.getElementById('workspace').scrollIntoView({ behavior: 'smooth' });
  if (index === 1) document.getElementById('chatMessage').focus();
  if (index === 2) openModal(projectModal);
}));

document.getElementById('projectForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('projectName');
  const card = document.createElement('article');
  card.className = 'project-card added-card';
  card.dataset.project = name;
  card.innerHTML = `<div class="project-top"><span class="project-icon">✦</span><button class="project-menu" aria-label="Loyiha menyusi">•••</button></div><div class="mini-preview new-preview"><span>✦</span><b>AI is preparing<br />your workspace</b><small>${form.get('framework')}</small></div><div class="project-info"><div><h3>${name}</h3><p>${form.get('framework')}</p></div><span class="stage">Setting up</span></div><div class="project-footer"><div class="members"><i>IT</i></div><span>Created just now</span></div>`;
  document.querySelector('.project-grid').prepend(card);
  closeModal(projectModal);
  event.currentTarget.reset();
  showToast(`${name} workspace created with AI`);
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelector('.project-grid').addEventListener('click', (event) => {
  const card = event.target.closest('.project-card');
  if (!card) return;
  if (event.target.closest('.project-menu')) { showToast(`${card.dataset.project}: menu opened`); return; }
  document.getElementById('workspace').scrollIntoView({ behavior: 'smooth' });
  showToast(`Opening ${card.dataset.project} workspace`);
});
document.getElementById('viewProjectsButton').addEventListener('click', () => showToast('Showing your 24 active projects'));

const codeSamples = {
  'workspace.tsx': `<b>import</b> { Workspace, Agent } <b>from</b> <i>'@uzcode/ai'</i>;

<label>3</label><b>export default function</b> <strong>Studio</strong>() {
<label>4</label>  <b>return</b> (
<label>5</label>    <i>&lt;Workspace</i> project=<q>"UzCode AI"</q><i>&gt;</i>
<label>6</label>      <i>&lt;Agent</i> role=<q>"frontend"</q> active <i>/&gt;</i>
<label>7</label>      <i>&lt;Agent</i> role=<q>"reviewer"</q> active <i>/&gt;</i>
<label>8</label>    <i>&lt;/Workspace&gt;</i>
<label>9</label>  );
<label>10</label>}`,
  'ai-chat.tsx': `<label>1</label><b>export function</b> <strong>Copilot</strong>() {
<label>2</label>  <b>return</b> <i>&lt;Assistant</i> streaming <i>/&gt;</i>;
<label>3</label>}`,
  'agent-config.ts': `<label>1</label><b>export const</b> <strong>agents</strong> = [
<label>2</label>  { role: <q>"architect"</q>, model: <i>"gpt-5"</i> },
<label>3</label>  { role: <q>"frontend"</q>, model: <i>"gpt-5"</i> },
<label>4</label>  { role: <q>"reviewer"</q>, active: <u>true</u> }
<label>5</label>];`,
  'package.json': `<label>1</label>{
<label>2</label>  <q>"name"</q>: <i>"uzcode-platform"</i>,
<label>3</label>  <q>"scripts"</q>: { <q>"dev"</q>: <i>"next dev"</i> },
<label>4</label>  <q>"private"</q>: <u>true</u>
<label>5</label>}`,
  'README.md': `<label>1</label><strong># UzCode AI Workspace</strong>
<label>2</label>Build smarter. Code faster. Deploy everywhere.
<label>3</label>
<label>4</label><b>## Commands</b>
<label>5</label><i>npm run dev</i>`
};
const editorCode = document.getElementById('editorCode');
const openFile = (file) => {
  editorCode.innerHTML = codeSamples[file] || codeSamples['workspace.tsx'];
  document.querySelectorAll('.file-item').forEach((item) => item.classList.toggle('active-file', item.dataset.file === file));
  document.querySelectorAll('.editor-tab').forEach((tab) => tab.classList.toggle('active-tab', tab.dataset.tab === file));
  showToast(`${file} opened in editor`);
};
document.querySelectorAll('.file-item').forEach((item) => item.addEventListener('click', () => openFile(item.dataset.file)));
document.querySelectorAll('.editor-tab').forEach((tab) => tab.addEventListener('click', () => openFile(tab.dataset.tab)));
document.querySelector('.new-tab').addEventListener('click', () => showToast('New file dialog is ready'));

document.getElementById('chatForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('chatMessage');
  const message = input.value.trim();
  if (!message) return;
  const history = document.querySelector('.chat-history');
  history.insertAdjacentHTML('beforeend', `<div class="message user dynamic-message">${message}</div><div class="message ai dynamic-message typing"><span>✦</span><p>AI is analysing your workspace<span class="typing-dots">...</span></p></div>`);
  input.value = '';
  history.scrollTop = history.scrollHeight;
  setTimeout(() => {
    const typing = history.querySelector('.typing');
    if (typing) typing.innerHTML = `<span>✦</span><p>I mapped the next implementation steps and prepared a clean component structure.<small>Just now</small></p>`;
    history.scrollTop = history.scrollHeight;
  }, 700);
});

document.querySelectorAll('.agent-card').forEach((card) => card.addEventListener('click', () => {
  document.querySelectorAll('.agent-card').forEach((item) => item.classList.remove('selected'));
  card.classList.add('selected');
  showToast(`${card.querySelector('h3').textContent} is selected`);
}));
document.getElementById('addAgentButton').addEventListener('click', () => showToast('Custom agent builder opened'));
document.getElementById('manageAgentsButton').addEventListener('click', () => showToast('12 AI agents are available in this workspace'));

const notificationPanel = document.getElementById('notificationPanel');
document.getElementById('notificationsButton').addEventListener('click', () => notificationPanel.classList.toggle('show'));
document.getElementById('markReadButton').addEventListener('click', () => { notificationPanel.classList.remove('show'); document.querySelector('.notification-dot').style.display = 'none'; showToast('All notifications marked as read'); });
document.getElementById('overviewButton').addEventListener('click', () => { document.querySelector('.architecture').scrollIntoView({ behavior: 'smooth' }); showToast('Platform overview loaded'); });
document.querySelector('.upgrade button').addEventListener('click', () => showToast('Pro plan comparison opened'));
document.querySelector('.profile').addEventListener('click', () => showToast('Account menu opened'));
document.querySelectorAll('footer a').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); showToast(`${link.textContent} page opened`); }));
document.querySelectorAll('.operation-action').forEach((button) => button.addEventListener('click', () => showToast(`${button.textContent.trim()} completed`)));
document.querySelectorAll('.setting-row input').forEach((input) => input.addEventListener('change', () => showToast('Workspace preference updated'));
