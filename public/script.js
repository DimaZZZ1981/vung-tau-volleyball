// ============================================
// МОБИЛЬНОЕ МЕНЮ
// ============================================
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.navbar-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.textContent = '☰';
  });
});

// ============================================
// ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКОВ
// ============================================
const langBtns = document.querySelectorAll('.lang-btn');

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });
  localStorage.setItem('lang', lang);
}

// Применить язык при загрузке
const savedLang = localStorage.getItem('lang') || 'vi';
applyLanguage(savedLang);
langBtns.forEach(btn => {
  btn.classList.toggle('active', btn.dataset.lang === savedLang);
});

// Переключение по клику
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    langBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyLanguage(btn.dataset.lang);
  });
});

// ============================================
// ПЛАВНАЯ ПОДСВЕТКА АКТИВНОГО РАЗДЕЛА В МЕНЮ
// ============================================
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.navbar-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      menuLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--sand)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));
