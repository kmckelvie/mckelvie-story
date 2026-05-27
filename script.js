// =============== GALLERY FILTER ===============
const filters = document.querySelectorAll('.gal-filter');
const items = document.querySelectorAll('.gal-item');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('is-active'));
    btn.classList.add('is-active');
    const cat = btn.dataset.filter;
    items.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.classList.remove('is-hidden');
      } else {
        item.classList.add('is-hidden');
      }
    });
  });
});

// =============== LIGHTBOX ===============
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.querySelector('.lb-close');
const lbPrev = document.querySelector('.lb-prev');
const lbNext = document.querySelector('.lb-next');
let currentIndex = 0;
let activeItems = [];

function getVisibleItems() {
  return Array.from(items).filter(i => !i.classList.contains('is-hidden'));
}

function openLightbox(index) {
  activeItems = getVisibleItems();
  currentIndex = index;
  showCurrent();
  lb.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function showCurrent() {
  const item = activeItems[currentIndex];
  const img = item.querySelector('img');
  const cap = item.querySelector('figcaption');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCaption.textContent = cap ? cap.textContent : '';
}

function closeLightbox() {
  lb.classList.remove('is-open');
  document.body.style.overflow = '';
}

function next() {
  currentIndex = (currentIndex + 1) % activeItems.length;
  showCurrent();
}

function prev() {
  currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
  showCurrent();
}

items.forEach((item, idx) => {
  item.addEventListener('click', () => {
    const visible = getVisibleItems();
    const visibleIdx = visible.indexOf(item);
    if (visibleIdx !== -1) openLightbox(visibleIdx);
  });
});

lbClose.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', next);
lbPrev.addEventListener('click', prev);

lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});
