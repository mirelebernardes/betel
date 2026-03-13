/* ======================================================
   BETEL TRANSPORTES – JavaScript
   Features: Sticky header, mobile menu, counter animation,
   testimonials slider, scroll animations, back-to-top
   ====================================================== */

// ---- Utility: throttle ----
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) { lastCall = now; fn(...args); }
  };
}

// =====================
// 1. STICKY HEADER
// =====================
const header = document.getElementById('header');
function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', throttle(updateHeader, 50));
updateHeader();

// =====================
// 2. MOBILE MENU
// =====================
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  if (navMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5.5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5.5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu when a link is clicked
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// =====================
// 3. ACTIVE NAV LINK (Scroll Spy)
// =====================
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

function scrollSpy() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', throttle(scrollSpy, 100));

// =====================
// 4. COUNTER ANIMATION
// =====================
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start    = performance.now();

  function step(timestamp) {
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counters    = document.querySelectorAll('.stat-card__number');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => animateCounter(counter));
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// =====================
// 5. TESTIMONIALS SLIDER
// =====================
const cards  = document.querySelectorAll('.testimonial-card');
const dots   = document.querySelectorAll('.tst-dot');
const prevBtn = document.getElementById('tstPrev');
const nextBtn = document.getElementById('tstNext');
let current = 0;
let autoSlide;

function showSlide(index) {
  cards.forEach((c, i) => c.classList.toggle('active', i === index));
  dots.forEach((d, i)  => d.classList.toggle('active', i === index));
  current = index;
}

function nextSlide() { showSlide((current + 1) % cards.length); }
function prevSlide() { showSlide((current - 1 + cards.length) % cards.length); }

function resetAuto() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}

nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { showSlide(i); resetAuto(); });
});

resetAuto();

// =====================
// 6. SCROLL-IN ANIMATIONS (Fade Up)
// =====================
const animateEls = document.querySelectorAll(
  '.service-card, .fleet-card, .diff-card, .about__content, .about__image-wrapper'
);

// Set initial state
animateEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger children inside grids
function staggerReveal(parent, selector) {
  const children = parent.querySelectorAll(selector);
  children.forEach((el, index) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(el);
  });
}

staggerReveal(document.querySelector('.services__grid'), '.service-card');
staggerReveal(document.querySelector('.fleet__grid'), '.fleet-card');
staggerReveal(document.querySelector('.diff__grid'), '.diff-card');

document.querySelectorAll('.about__content, .about__image-wrapper').forEach(el => {
  revealObserver.observe(el);
});

// =====================
// 7. BACK TO TOP BUTTON
// =====================
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', throttle(() => {
  backTop.classList.toggle('visible', window.scrollY > 400);
}, 100));

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =====================
// 8. CONTACT FORM (Simple client-side validation)
// =====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;

    // Basic validation
    const required = ['name', 'phone', 'email'];
    let valid = true;

    required.forEach(field => {
      const input = contactForm.querySelector(`[name="${field}"]`);
      if (!input || !input.value.trim()) {
        valid = false;
        input.style.borderColor = '#e55';
        input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
      }
    });

    if (!valid) {
      btn.textContent = 'Preencha os campos obrigatórios';
      btn.style.background = '#e55';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
      }, 2500);
      return;
    }

    // Simulate submission
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        btn.textContent = '✓ Solicitação enviada com sucesso!';
        btn.style.background = '#27ae60';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            btn.textContent = data["errors"].map(error => error["message"]).join(", ");
          } else {
            btn.textContent = 'Erro ao enviar. Tente novamente.';
          }
          btn.style.background = '#e55';
          setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        });
      }
    }).catch(error => {
      btn.textContent = 'Erro de conexão. Tente novamente.';
      btn.style.background = '#e55';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  });
}

// =====================
// 9. SMOOTH ANCHOR SCROLLING (accounting for fixed header)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
