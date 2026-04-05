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

// ============================================
// ГАЛЕРЕЯ — показать/скрыть
// ============================================
const GALLERY_VISIBLE = 6;
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const galleryToggle = document.getElementById('gallery-toggle');
let galleryExpanded = false;

galleryItems.forEach((item, i) => {
  if (i >= GALLERY_VISIBLE) item.classList.add('gallery-hidden');
});

galleryToggle.addEventListener('click', () => {
  galleryExpanded = !galleryExpanded;
  const lang = localStorage.getItem('lang') || 'vi';
  galleryItems.forEach((item, i) => {
    if (i >= GALLERY_VISIBLE) item.classList.toggle('gallery-hidden', !galleryExpanded);
  });
  galleryToggle.setAttribute('data-i18n', galleryExpanded ? 'gallery.showLess' : 'gallery.showMore');
  galleryToggle.innerHTML = translations[lang][galleryExpanded ? 'gallery.showLess' : 'gallery.showMore'];
});

// ============================================
// ЛАЙТБОКС
// ============================================
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbCounter = document.getElementById('lb-counter');
const lbClose   = document.getElementById('lb-close');
const lbPrev    = document.getElementById('lb-prev');
const lbNext    = document.getElementById('lb-next');

const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lbImg.src = galleryImgs[index].src;
  lbImg.alt = galleryImgs[index].alt;
  lbCounter.textContent = `${index + 1} / ${galleryImgs.length}`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showNext() {
  openLightbox((currentIndex + 1) % galleryImgs.length);
}

function showPrev() {
  openLightbox((currentIndex - 1 + galleryImgs.length) % galleryImgs.length);
}

galleryImgs.forEach((img, i) => {
  img.parentElement.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  showNext();
  if (e.key === 'ArrowLeft')   showPrev();
});
