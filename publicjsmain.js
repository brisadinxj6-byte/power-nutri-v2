/* ==========================================
   POWER NUTRI - MAIN.JS
   Inicialização e eventos globais
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMenuHamburger();
  initScrollEffects();
  initAffiliateLinks();
  loadCategories();
  loadBrands();
});

/* MENU HAMBURGER */
function initMenuHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* EFEITOS DE SCROLL */
function initScrollEffects() {
  const elements = document.querySelectorAll('.card, .section-title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

/* LINKS DE AFILIADO - RASTREAMENTO */
function initAffiliateLinks() {
  const affiliateLinks = document.querySelectorAll('[data-affiliate]');

  affiliateLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const category = link.dataset.affiliate;
      trackAffiliateClick(category);
    });
  });
}

function trackAffiliateClick(category) {
  // Google Analytics (se configurado)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'affiliate_click', {
      'category': category
    });
  }

  // Log simples
  console.log(`Clique em afiliado: ${category}`);
}

/* CARREGAR CATEGORIAS */
async function loadCategories() {
  const categoriesContainer = document.getElementById('categories-grid');
  if (!categoriesContainer) return;

  try {
    const response = await fetch('/data/categories.json');
    const data = await response.json();

    categoriesContainer.innerHTML = data.categories.map(category => `
      <a href="${category.url}" 
         class="card category-card" 
         data-affiliate="${category.slug}"
         target="_blank"
         rel="noopener noreferrer">
        <div class="category-icon" style="font-size: 48px; margin-bottom: 16px;">
          ${category.icon}
        </div>
        <h3 class="card-title">${category.name}</h3>
        <p class="card-text">${category.description}</p>
        <div class="card-footer">
          <span class="badge-red">Explorar →</span>
        </div>
      </a>
    `).join('');

    // Re-iniciar observador para novas categorias
    initScrollEffects();
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

/* CARREGAR MARCAS */
async function loadBrands() {
  const brandsContainer = document.getElementById('brands-grid');
  if (!brandsContainer) return;

  try {
    const response = await fetch('/data/brands.json');
    const data = await response.json();

    brandsContainer.innerHTML = data.brands.map(brand => `
      <a href="${brand.url}" 
         class="card brand-card" 
         data-affiliate="${brand.slug}"
         target="_blank"
         rel="noopener noreferrer">
        <h3 class="card-title">${brand.name}</h3>
        <p class="card-text">${brand.description}</p>
        <div class="card-footer">
          <span class="badge-red">Visitar →</span>
        </div>
      </a>
    `).join('');

    // Re-iniciar observador para novas marcas
    initScrollEffects();
  } catch (error) {
    console.error('Erro ao carregar marcas:', error);
  }
}

/* FILTROS DE CATÁLOGO */
function initCatalogFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover ativa de todos
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Adicionar active ao clicado
      button.classList.add('active');

      const filter = button.dataset.filter;

      // Animar cards
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* BUSCA RÁPIDA */
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      if (title.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* COMPARTILHAR */
function shareCategory(name, url) {
  if (navigator.share) {
    navigator.share({
      title: 'Power Nutri',
      text: `Confira a categoria ${name} na Power Nutri!`,
      url: window.location.href
    });
  } else {
    // Fallback
    alert(`Compartilhe este link: ${url}`);
  }
}

/* DEBOUNCE */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* SCROLL SUAVE */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* INICIALIZAR FILTROS NA PÁGINA DE CATÁLOGO */
if (document.getElementById('filter-btn-all')) {
  initCatalogFilters();
}

/* INICIALIZAR BUSCA NA PÁGINA DE CATÁLOGO */
if (document.getElementById('search-input')) {
  initSearch();
}
