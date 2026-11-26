/* =========================================================
   田津硕的练习手帐 — 交互脚本
   1) 案例数据（要增删一则，只改下面的 projects 数组）
   2) 渲染案例卡片
   3) 作品计数 / 微信复制 / 导航高亮 / 阅读进度 / 滚动入场
   ========================================================= */

const GITHUB_USER = 'Tjs147852369';
const REPO_BASE = `https://github.com/${GITHUB_USER}/`;

/* ---------------------------------------------------------
   每一则案例的字段：
   repo      仓库名，会拼成 github 链接
   title     项目名
   line      一句话副标题
   user      谁在用 / 什么场景
   problem   遇到的问题
   approach  我的做法（数组，页面会渲染成列表）
   result    结果与复盘（没有明确结果时，就写当时的反思）
   metric    一行成果，只有填了真实数据才会显示；没有就写 null
   feedback  试用反馈（数组，默认空；空数组时整块不显示）
   notice    卡片里的提示语（可选）
   tags      技术小标签
   demo      演示地址，没有就写 null
   status    状态小标记（可选，例如 "实验项目"）
   --------------------------------------------------------- */
const projects = [
  {
    repo: 'clinical-review-assistant',
    title: '医学生复盘 / 错题整理',
    line: '我得知道自己到底错在哪',
    user: '复习的时候，我自己用。',
    problem:
      '错题一多就散了。抄在本子上，考前想找规律，翻半天也翻不出来，最后还是凭感觉重做一遍。',
    approach: [
      '按科目和知识点归类，每道题写清错因——是不会、是看漏了，还是根本没记住。',
      '把同一个知识点下的题放在一起，方便看出自己反复栽在什么地方。'
    ],
    result:
      '它不替我学习，也不给答案，只是把「复盘」固定成我每周都会做的一个动作。',
    metric: null,
    feedback: [],
    tags: ['JavaScript', '数据结构化', '离线可用'],
    // TODO: 部署到 GitHub Pages 后，把演示地址填到这里，页面会自动出现「看演示」。
    demo: null,
    status: null
  },
  {
    repo: null,
    slug: 'douyin-football',
    title: '抖音足球趣事账号 · 内容运营',
    line: '把一条爆款拆开，看它到底做对了什么',
    user: '喜欢足球的抖音用户',
    problem:
      '足球内容很多，我想弄明白什么样的选题和开头，能让陌生人停下来看完。',
    approach: [
      '自己负责选题、脚本、剪辑和发布。',
      '对爆款那一条，回头拆它的选题角度、开头和发布时间。',
      '借助 Codex 写 Python 脚本，把作品数据整理排序。'
    ],
    result: '单条作品播放 33 万+、点赞 1600+。',
    metric: null,
    feedback: [],
    tags: ['内容运营', '选题策划', '数据复盘'],
    demo: ''
  },
  // TODO: 播放量以抖音创作者中心后台数据为准，如与 33 万有出入请改这里
  // TODO: 想补完播率、转发数、涨粉数，加在 result 里，没有就不要写
  {
    repo: 'nursing-handover-assistant',
    title: '护理交班助手',
    line: '交班前，我先把话理清楚',
    user: '临床交班这个场景，我自己在用。',
    problem:
      '交班的时候，我的信息是碎的：一部分在纸上，一部分在微信群里，还有一部分只在脑子里。写漏一条，下一班就要多问一轮，我心里也不踏实。',
    approach: [
      '按交班常见的几个方面做成结构化填写：病情、管路、用药、待办，填的时候不容易整块跳过。',
      '填完自动拼成一段能直接念出来的交班文字，临交班前顺着过一遍。'
    ],
    result:
      '做完我才发现，最有用的不是「帮我写」，而是它在旁边提醒我「这条你还没填」。',
    // metric：一行成果。没有真实数据就保持 null，页面上不会出现这一行。
    // 以后有了真实数据，例如 '把所有交班字段压进一页，平均 2 分钟写完。'
    metric: null,
    // feedback：默认空数组，页面上不会出现「试用反馈」这一块。
    // 以后有人试用过，往数组里加字符串就行，例如：
    // feedback: ['同学说交班那段话太长，我把它拆成了三段。']
    feedback: [],
    notice: '演示页面不存储任何真实患者信息，请勿填写真实姓名、床号等隐私内容。',
    tags: ['JavaScript', '结构化表单', 'GitHub Pages'],
    demo: 'https://tjs147852369.github.io/nursing-handover-assistant/',
    status: null
  },
  {
    repo: 'fitwell-qinglian',
    title: 'FitWell 轻练 · 健身饮食习惯',
    line: '先记下来，再谈完美',
    user: '我自己每天记，手机上用。',
    problem:
      '健身最难的不是练，是吃得心里没数。可精确到克的记录太麻烦，我坚持不过三天，之后就干脆不记了。',
    approach: [
      '把记录做轻：这一餐大概吃了什么、今天练了什么，两句话就能写完。',
      '不做卡路里算术，只看「今天有没有做」，连续几天一眼能看见。'
    ],
    result:
      '我的结论很土但很真：习惯比数字重要，能坚持的记录才叫记录。',
    metric: null,
    feedback: [],
    tags: ['JavaScript', '移动端优先', '本地存储'],
    // TODO: 部署到 GitHub Pages 后，把演示地址填到这里。
    demo: null,
    status: null
  },
  {
    repo: 'EDITH',
    title: 'EDITH',
    line: '把 AI 放进真实的交互里试一次',
    user: '我自己拿来做交互实验，还没有给别人用。',
    problem:
      '我很想知道 AI 到底是怎么被「用起来」的，而不只是在对话框里聊两句。',
    // TODO: 这里还没写具体功能，等我把 EDITH 整理好再补：
    //       它到底做了什么、怎么调用 AI、哪一步最花时间。
    approach: [
      '把 AI 放进具体的界面流程里试：它该在什么时候出现、说什么话、结果放在哪里。',
      '做过很多不好看、也不太好用的版本，每删掉一个就多懂一点。'
    ],
    result:
      '它现在还在长，我把它留在这个网站里，方便以后回来看当时的想法。',
    metric: null,
    feedback: [],
    tags: ['AI 接口调用', 'JavaScript', '交互实验'],
    demo: null,
    status: '实验项目'
  }
];

/* ---------- 渲染案例 ---------- */
function entryTemplate(item, index) {
  const no = String(index + 1).padStart(2, '0');

  const tags = item.tags.map((t) => `<li class="tag">${t}</li>`).join('');
  const steps = item.approach.map((s) => `<li>${s}</li>`).join('');
  const status = item.status
    ? `<span class="entry__status">${item.status}</span>`
    : '';

  // 只在有真实成果时显示这一行
  const metric = item.metric
    ? `
        <div class="entry__block">
          <p class="entry__label">成果</p>
          <p class="entry__metric">${item.metric}</p>
        </div>`
    : '';

  const demo = item.demo
    ? `<a class="link link--demo" href="${item.demo}" target="_blank" rel="noopener">看演示 <span class="arrow" aria-hidden="true">↗</span></a>`
    : `<span class="entry__soon">作品链接整理中</span>`;

  const repoLink = item.repo
    ? `<a class="link" href="${REPO_BASE}${item.repo}" target="_blank" rel="noopener">源码 <span class="arrow" aria-hidden="true">↗</span></a>`
    : '';

  const slug = item.slug || item.repo;

  const feedback = item.feedback && item.feedback.length
    ? `
        <div class="entry__block">
          <p class="entry__label">试用反馈与我改了什么</p>
          <ul class="entry__feedback-list">
            ${item.feedback.map((f) => `<li>${f}</li>`).join('')}
          </ul>
        </div>`
    : '';

  const notice = item.notice
    ? `<p class="entry__notice">${item.notice}</p>`
    : '';

  return `
    <article class="entry glass-on-light" data-reveal>
      <div class="entry__meta">
        <span class="entry__case">CASE ${no}</span>
        <span class="entry__meta-right">
          ${status}
          ${slug ? `<span class="entry__slug">${slug}</span>` : ''}
        </span>
      </div>

      <h3 class="entry__title">${item.title}</h3>
      <p class="entry__line">${item.line}</p>

      <div class="entry__block">
        <p class="entry__label">场景</p>
        <p class="entry__text">${item.user}</p>
      </div>

      <div class="entry__block">
        <p class="entry__label">问题</p>
        <p class="entry__text">${item.problem}</p>
      </div>

      <div class="entry__block">
        <p class="entry__label">我的做法</p>
        <ul class="entry__steps">${steps}</ul>
      </div>

      <div class="entry__block">
        <p class="entry__label">结果与复盘</p>
        <p class="entry__text">${item.result}</p>
      </div>

      ${metric}
      ${feedback}
      ${notice}

      <ul class="tags">${tags}</ul>

      <div class="entry__links">
        ${repoLink}
        ${demo}
      </div>
    </article>
  `;
}

const worksList = document.getElementById('works-list');
if (worksList) {
  worksList.innerHTML = projects.map(entryTemplate).join('');
}

/* ---------- 封面上的作品数量，跟着数组走 ---------- */
const countEl = document.getElementById('project-count');
if (countEl) countEl.textContent = projects.length;

/* ---------- 作品章节副标题，跟着数组走 ---------- */
const worksNote = document.getElementById('works-note');
if (worksNote) {
  worksNote.textContent = `共 ${projects.length} 则案例，每则都写了当时的问题、我的做法，和后来想明白的事。`;
}

/* ---------- 终端里的项目目录，跟着数组走 ---------- */
const dirsEl = document.querySelector('[data-projects-dirs]');
if (dirsEl) {
  const dirs = projects.map((p) => p.slug || p.repo).filter(Boolean);
  dirsEl.textContent = dirs.map((d) => d + '/').join('  ');
}

/* ---------- 技能分组：以后加标签只改这里 ---------- */
const skills = [
  { title: '页面与交互', tags: ['HTML', 'CSS', 'JavaScript', '结构化表单', '本地存储'] },
  { title: '版本与发布', tags: ['Git', 'GitHub', 'GitHub Pages'] },
  { title: 'AI 工具', tags: ['Trae', 'Codex', 'Claude', 'DeepSeek'] },
  { title: '做事的方法', tags: ['需求拆解', '提示词编写', '复盘写作', '先做出能点开的版本再迭代'] },
  { title: '还在学的', learning: true, tags: ['TypeScript', '响应式与中文排版'] }
];

const skillsList = document.getElementById('skills-list');
if (skillsList) {
  skillsList.innerHTML = skills.map((group) => `
        <div class="skill-group">
          <h3 class="skill-group__title">${group.title}</h3>
          <ul class="tags glass-on-light">
            ${group.tags.map((tag) => `<li class="tag${group.learning ? ' tag--learning' : ''}">${tag}</li>`).join('')}
          </ul>
        </div>`).join('');
}

/* ---------- 写过的笔记：url 为空的不显示，全部为空则整个区块不出现 ---------- */
// TODO: 把小红书每篇笔记的链接填进来
const notes = [
  { title: 'AI做小工具，翻车都在这4个地方', url: '' },
  { title: '跟AI提需求，我后来只写这4句', url: '' },
  { title: '我用AI把想法做成了能装的小工具', url: '' },
  { title: '健身App广告太多，我自己写了一个', url: '' }
];

const notesBox = document.getElementById('notes');
const linkedNotes = notes.filter((note) => note.url);
if (notesBox && linkedNotes.length) {
  notesBox.innerHTML = `
        <h3 class="notes__title">同时我也在写</h3>
        <p class="notes__text">把做的过程写下来，是我复盘的方式。</p>
        <ul class="notes__list">
          ${linkedNotes.map((note) => `<li><a class="link" href="${note.url}" target="_blank" rel="noopener">${note.title} <span class="arrow" aria-hidden="true">↗</span></a></li>`).join('')}
        </ul>`;
  notesBox.hidden = false;
}

/* ---------- 联系区第四张卡片：填了链接才显示 ---------- */
// TODO: 填小红书主页链接
const xiaohongshu = { label: '小红书', value: '不爱吃糖', url: '' };

const contactGrid = document.querySelector('.contact-grid');
if (contactGrid && xiaohongshu.url) {
  contactGrid.insertAdjacentHTML('beforeend', `
        <a class="contact-card glass-on-blue" href="${xiaohongshu.url}" target="_blank" rel="noopener">
          <span class="contact-card__label">${xiaohongshu.label}</span>
          <span class="contact-card__value">${xiaohongshu.value}</span>
        </a>`);
}

/* ---------- 复制微信号（整张联系卡片可点） ---------- */
const copyBtn = document.querySelector('[data-copy]');
if (copyBtn) {
  const label = copyBtn.querySelector('[data-copy-label]');
  const originalText = label ? label.textContent : '';
  let resetTimer = null;

  const showCopied = () => {
    if (label) label.textContent = '已复制';
    copyBtn.classList.add('is-copied');
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      if (label) label.textContent = originalText;
      copyBtn.classList.remove('is-copied');
    }, 1500);
  };

  copyBtn.addEventListener('click', async () => {
    const text = copyBtn.dataset.copy;
    let done = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        done = true;
      }
    } catch (err) {
      done = false;
    }

    // 兜底：老浏览器或非 https 环境
    if (!done) {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.top = '-1000px';
      document.body.appendChild(helper);
      helper.select();
      try {
        done = document.execCommand('copy');
      } catch (err) {
        done = false;
      }
      document.body.removeChild(helper);
    }

    if (done) showCopied();
  });
}

/* ---------- 滚动入场 ---------- */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((el) => el.classList.add('is-in'));
} else {
  // 同一批里按顺序错开一点点
  document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => {
    el.style.setProperty('--d', `${60 + i * 70}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -4% 0px' }
  );

  revealItems.forEach((el) => revealObserver.observe(el));
}

/* ---------- 导航高亮 ---------- */
const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.nav))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const active = link.dataset.nav === id;
          link.classList.toggle('is-active', active);
          if (active) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => navObserver.observe(section));
}

/* ---------- 阅读进度 ---------- */
const progressBar = document.getElementById('progress');
let ticking = false;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
  ticking = false;
}

window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  },
  { passive: true }
);
window.addEventListener('resize', updateProgress);
updateProgress();
