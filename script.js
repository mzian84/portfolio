// ========================
// Smooth scrolling for internal anchor links
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetSection = document.querySelector(anchor.getAttribute('href'));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========================
// Elements
// ========================
const logo = document.querySelector('.logo');
const hero = document.querySelector('.hero');
const menuIcon = document.getElementById('menu-icon');
const navLinksContainer = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const scrollElements = document.querySelectorAll('.scroll-animation');
const sections = document.querySelectorAll('section');

// ========================
// Mobile menu toggle
// ========================
menuIcon.addEventListener('click', () => {
  navLinksContainer.classList.toggle('show');
});

// ========================
// Logo visibility on scroll
// ========================
function updateLogoVisibility() {
  const triggerPoint = hero.offsetHeight - 80; // Adjust for navbar height
  if (window.scrollY > triggerPoint) {
    logo.classList.add('show');
    logo.classList.remove('hidden');
  } else {
    logo.classList.remove('show');
    logo.classList.add('hidden');
  }
}
window.addEventListener('scroll', updateLogoVisibility);
window.addEventListener('load', updateLogoVisibility);
window.addEventListener('hashchange', updateLogoVisibility);

// ========================
// Observer #1: Scroll animation trigger
// ========================
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: 0.1 });

scrollElements.forEach(el => animationObserver.observe(el));

// ========================
// Observer #2: Navbar highlight
// ========================
const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => highlightObserver.observe(section));

// Extra: Force "Home" highlight at top of page
window.addEventListener('scroll', () => {
  if (window.scrollY < hero.offsetHeight / 2) {
    navLinks.forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
  }
});

// Contact form submit handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Collect data
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent.`);
      contactForm.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
}
