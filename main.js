// ============================================================
// VERDURA — Main JavaScript
// ============================================================

// ── Nature Animation Layer ──────────────────────────────────
const NATURES = ['🌿','🍃','🌱','🌾','🍀','🌺','🌸','🌻','🌼','💐','🌷','🌹','🪷','🦋','✿'];
const PETAL_COLORS = [
  ['#ff9999','#ffb3b3'],['#ff85b3','#ffadd3'],['#ffd6a5','#ffe8cc'],
  ['#caffbf','#b7d7a8'],['#d0bfff','#e4d9ff'],['#ffd6e7','#ffecf5'],
  ['#fdffb6','#fff5a0'],['#a8e6cf','#c8f4df'],
];

function spawnParticle() {
  const layer = document.getElementById('natureLayer');
  const el = document.createElement('span');
  el.className = 'nature-particle';
  el.textContent = NATURES[Math.floor(Math.random() * NATURES.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
  const duration = 12 + Math.random() * 15;
  const delay = Math.random() * 5;
  el.style.animationDuration = duration + 's';
  el.style.animationDelay = delay + 's';
  el.style.filter = `hue-rotate(${Math.random()*40-20}deg)`;
  layer.appendChild(el);
  setTimeout(() => el.remove(), (duration + delay) * 1000 + 500);
}

function spawnPetal() {
  const layer = document.getElementById('natureLayer');
  const el = document.createElement('div');
  el.className = 'petal';
  const col = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.background = `linear-gradient(135deg, ${col[0]}, ${col[1]})`;
  el.style.width = (10 + Math.random() * 10) + 'px';
  el.style.height = (14 + Math.random() * 14) + 'px';
  el.style.opacity = 0.6 + Math.random() * 0.3;
  const duration = 10 + Math.random() * 14;
  const delay = Math.random() * 4;
  el.style.animationDuration = duration + 's';
  el.style.animationDelay = delay + 's';
  layer.appendChild(el);
  setTimeout(() => el.remove(), (duration + delay) * 1000 + 500);
}

// Spawn nature particles at intervals
setInterval(spawnParticle, 1200);
setInterval(spawnPetal, 900);
// Initial burst
for (let i = 0; i < 12; i++) {
  setTimeout(spawnParticle, i * 200);
  setTimeout(spawnPetal, i * 150 + 100);
}

// ── Navbar Scroll ────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ── Hamburger Menu ───────────────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});

function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
}

// ── Counter Animation ────────────────────────────────────────
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ── Menu Data ─────────────────────────────────────────────────
const menuItems = [
  {
    id: 1, name: 'Garden Bruschetta', cat: 'starters',
    desc: 'Heirloom tomatoes, basil oil, whipped ricotta on sourdough.',
    price: 280, badges: ['vegan'], image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&auto=format&fit=crop'
  },
  {
    id: 2, name: 'Harvest Soup', cat: 'starters',
    desc: 'Seasonal vegetable bisque with truffle oil and herb cream.',
    price: 320, badges: ['vegan', 'new'], image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&auto=format&fit=crop'
  },
  {
    id: 3, name: 'Wild Mushroom Risotto', cat: 'mains',
    desc: 'Arborio rice, foraged mushrooms, aged parmigiano, truffle.',
    price: 680, badges: ['chef'], image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&auto=format&fit=crop'
  },
  {
    id: 4, name: 'Roasted Rainbow Bowl', cat: 'mains',
    desc: 'Seasonal roasted vegetables, quinoa, tahini dressing, seeds.',
    price: 560, badges: ['vegan'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop'
  },
  {
    id: 5, name: 'Spiced Lentil Dhal', cat: 'mains',
    desc: 'Red lentils, coconut milk, fresh turmeric, curry leaves.',
    price: 480, badges: ['vegan', 'spicy'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop'
  },
  {
    id: 6, name: 'Verdura Signature Pasta', cat: 'mains',
    desc: 'House-made pappardelle, garden pesto, cherry tomatoes, pine nuts.',
    price: 620, badges: ['chef', 'new'], image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&auto=format&fit=crop'
  },
  {
    id: 7, name: 'Lavender Panna Cotta', cat: 'desserts',
    desc: 'Silky vanilla panna cotta, lavender honey, berry compote.',
    price: 340, badges: ['new'], image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop'
  },
  {
    id: 8, name: 'Chocolate Forest Cake', cat: 'desserts',
    desc: 'Dark chocolate, cherry, salted caramel, edible flowers.',
    price: 390, badges: ['chef'], image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&auto=format&fit=crop'
  },
  {
    id: 9, name: 'Garden Lemonade', cat: 'drinks',
    desc: 'Fresh lemon, basil, rose water, sparkling spring water.',
    price: 180, badges: ['vegan'], image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&auto=format&fit=crop'
  },
  {
    id: 10, name: 'Matcha Blossom Latte', cat: 'drinks',
    desc: 'Ceremonial matcha, oat milk, elderflower, rose petals.',
    price: 260, badges: ['vegan', 'new'], image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&auto=format&fit=crop'
  },
  {
    id: 11, name: 'Cauliflower Steak', cat: 'mains',
    desc: 'Whole roasted cauliflower, chermoula, crispy capers, pomegranate.',
    price: 540, badges: ['vegan', 'spicy'], image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&auto=format&fit=crop'
  },
  {
    id: 12, name: 'Fig & Goat Cheese Crostini', cat: 'starters',
    desc: 'Fresh figs, whipped goat cheese, walnut, thyme honey.',
    price: 300, badges: ['new'], image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&auto=format&fit=crop'
  }
];

let cart = [];

function renderMenuItems(items) {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';
  items.forEach((item, i) => {
    const badgesHTML = item.badges.map(b =>
      `<span class="badge ${b}">${b.charAt(0).toUpperCase()+b.slice(1)}</span>`
    ).join('');
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.style.animationDelay = (i * 0.08) + 's';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy"/>
      <div class="menu-card-body">
        <div class="menu-card-cat">${item.cat.charAt(0).toUpperCase()+item.cat.slice(1)}</div>
        <h3>${item.name}</h3>
        <div class="menu-badges">${badgesHTML}</div>
        <p>${item.desc}</p>
        <div class="menu-card-footer">
          <div class="price">₹${item.price} <span>/ serving</span></div>
          <button class="add-btn" onclick="addToCart(${item.id})" title="Add to cart">+</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ── Menu Tabs ─────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    const filtered = cat === 'all' ? menuItems : menuItems.filter(i => i.cat === cat);
    renderMenuItems(filtered);
  });
});

renderMenuItems(menuItems);

// ── Cart Toast ────────────────────────────────────────────────
let toastTimer;

function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  cart.push(item);
  const toast = document.getElementById('cartToast');
  const text = document.getElementById('cartToastText');
  text.textContent = `🛒 ${item.name} added!`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── Modal ──────────────────────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// ── Reservation Form ──────────────────────────────────────────
document.getElementById('reserveForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '⏳ Confirming...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('reserveSuccess').style.display = 'block';
    btn.textContent = '✅ Confirmed!';
    setTimeout(() => closeModal('reserveModal'), 2000);
  }, 1500);
});

// ── Newsletter Form ───────────────────────────────────────────
document.getElementById('nlForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('nlEmail').value;
  if (email) {
    document.getElementById('nlForm').style.display = 'none';
    document.getElementById('nlSuccess').style.display = 'block';
  }
});

// ── Contact Form ──────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    btn.textContent = '✅ Sent!';
    setTimeout(() => {
      btn.textContent = 'Send Message 🌿';
      btn.disabled = false;
      document.getElementById('formSuccess').style.display = 'none';
      e.target.reset();
    }, 3000);
  }, 1400);
});

// ── Scroll Reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

function setupReveals() {
  // About section
  const aboutLeft = document.querySelector('.about-left');
  const aboutRight = document.querySelector('.about-right');
  if (aboutLeft) { aboutLeft.classList.add('reveal-left'); revealObserver.observe(aboutLeft); }
  if (aboutRight) { aboutRight.classList.add('reveal-right'); revealObserver.observe(aboutRight); }

  // Gallery items
  document.querySelectorAll('.gallery-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.1) + 's';
    revealObserver.observe(el);
  });

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Testimonial cards
  document.querySelectorAll('.testi-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.15) + 's';
    revealObserver.observe(el);
  });

  // Features bar
  document.querySelectorAll('.feat').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.1) + 's';
    revealObserver.observe(el);
  });

  // Contact items
  document.querySelectorAll('.ci-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.12) + 's';
    revealObserver.observe(el);
  });
}

setupReveals();

// ── Smooth active link highlighting ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 120;
    if (window.scrollY >= top) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--green-mid)' : '';
  });
});

// ── Keyboard shortcut: press R to open reservation modal ─────
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    if (!document.querySelector('.modal-overlay.open')) openModal('reserveModal');
  }
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
