// ---- footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- mobile menu toggle ----
const menuToggle = document.getElementById('menuToggle');
const pinrow = document.getElementById('pinrow');

if (menuToggle && pinrow) {
  menuToggle.addEventListener('click', () => {
    const isOpen = pinrow.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  pinrow.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      pinrow.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- scroll reveal for sections ----
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ---- active pin highlight on scroll ----
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.pinrow a[href^="#"]');

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.pinrow a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => navObserver.observe(sec));
}
