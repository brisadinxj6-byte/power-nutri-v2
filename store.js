const PN_IMAGES={
 hero:'https://images.unsplash.com/photo-1646072507379-c6c9dca7de0c?auto=format&fit=crop&w=1600&q=85',
 whey:'https://images.unsplash.com/photo-1774793476310-fd7d843184c5?auto=format&fit=crop&w=900&q=82',
 creatine:'https://images.unsplash.com/photo-1704650311298-4d6915d34c64?auto=format&fit=crop&w=900&q=82',
 supplements:'https://images.unsplash.com/photo-1709976142774-ce1ef41a8378?auto=format&fit=crop&w=900&q=82',
 gym:'https://images.unsplash.com/photo-1768161680813-615df885ff82?auto=format&fit=crop&w=900&q=82'
};
const PN_PRODUCTS=[
{id:1,name:'Whey Protein',brand:'Integralmedica',category:'whey',desc:'Opção de proteína para complementar sua rotina alimentar e seus treinos.',image:PN_IMAGES.whey,alt:'Pote neutro de whey protein com scoop de pó',url:'https://meli.la/1JdTWc3',tag:'Mais procurado'},
{id:2,name:'Creatina Monohidratada',brand:'Dark Lab',category:'creatina',desc:'Conheça a opção de creatina e confira detalhes, apresentação e disponibilidade.',image:PN_IMAGES.creatine,alt:'Pote neutro de suplemento em pó com medidor',url:'https://meli.la/2L324Yk',tag:'Força & potência'},
{id:3,name:'Pré-Treino',brand:'Black Skull',category:'pretreino',desc:'Explore opções para sua rotina pré-treino. Confira composição e modo de uso no anúncio.',image:PN_IMAGES.gym,alt:'Atleta treinando em academia com iluminação escura',url:'https://meli.la/2kYg5QK',tag:'Energia & foco'},
{id:4,name:'BCAA',brand:'Growth',category:'bcaa',desc:'Consulte opções de aminoácidos e compare informações antes de escolher.',image:PN_IMAGES.supplements,alt:'Potes de suplementos e medidor sobre uma bancada',url:'https://meli.la/1T9AST8',tag:'Aminoácidos'},
{id:5,name:'Hipercalórico',brand:'Soldiers',category:'hipercalorico',desc:'Alternativa para quem procura complementar a ingestão calórica diária.',image:PN_IMAGES.whey,alt:'Pó de suplemento com medidor ao lado de um pote',url:'https://meli.la/1JvXZfN',tag:'Complemento alimentar'},
{id:6,name:'Vitaminas e Cápsulas',brand:'Várias marcas',category:'vitaminas',desc:'Veja opções disponíveis e confira os ingredientes e informações do fabricante.',image:PN_IMAGES.supplements,alt:'Frascos de suplementos e vitaminas',url:'https://meli.la/18D5Gf2',tag:'Bem-estar'}
];
const PN_CATEGORIES=[
{label:'Whey Protein',slug:'whey',icon:'🥤',copy:'Proteínas e blends',image:PN_IMAGES.whey},
{label:'Creatina',slug:'creatina',icon:'⚡',copy:'Força e desempenho',image:PN_IMAGES.creatine},
{label:'Pré-treino',slug:'pretreino',icon:'🔥',copy:'Sua rotina antes do treino',image:PN_IMAGES.gym},
{label:'Vitaminas',slug:'vitaminas',icon:'💊',copy:'Vitaminas e cápsulas',image:PN_IMAGES.supplements}
];
function pnCard(p){return '<article class="product-card"><div class="product-photo"><img src="'+p.image+'" alt="'+p.alt+'" loading="lazy"><span class="photo-tag">'+p.tag+'</span></div><div class="product-info"><div class="product-brand">'+p.brand+'</div><h3 class="product-name">'+p.name+'</h3><p class="product-desc">'+p.desc+'</p><a class="product-cta" href="'+p.url+'" target="_blank" rel="sponsored noopener noreferrer" data-affiliate="'+p.category+'">Ver oferta no Mercado Livre <span aria-hidden="true">↗</span></a><p class="image-disclaimer">Imagem ilustrativa. Confira embalagem e detalhes no anúncio.</p></div></article>'}
function pnRenderProducts(target,items){const el=document.querySelector(target);if(el)el.innerHTML=items.map(pnCard).join('')}
function pnRenderCategories(target){const el=document.querySelector(target);if(!el)return;el.innerHTML=PN_CATEGORIES.map(c=>'<a class="category-card" href="catalogo.html?categoria='+c.slug+'" style="--card-image:url(\''+c.image+'\')"><span class="category-icon">'+c.icon+'</span><h3>'+c.label+'</h3><p>'+c.copy+'</p></a>').join('')}
function pnInitMenu(){const b=document.querySelector('.menu-toggle'),m=document.querySelector('.nav-links');if(b&&m)b.addEventListener('click',()=>{const open=m.classList.toggle('open');b.setAttribute('aria-expanded',String(open));b.textContent=open?'✕':'☰'})}
function pnInitCatalog(){const grid=document.querySelector('#catalog-products');if(!grid)return;const search=document.querySelector('#product-search');const buttons=[...document.querySelectorAll('.filter-btn')];let active=new URLSearchParams(location.search).get('categoria')||'todos';function render(){const term=(search?.value||'').trim().toLocaleLowerCase('pt-BR');const list=PN_PRODUCTS.filter(p=>(active==='todos'||p.category===active)&&(p.name+' '+p.brand+' '+p.desc).toLocaleLowerCase('pt-BR').includes(term));grid.innerHTML=list.length?list.map(pnCard).join(''):'<div class="empty-state">Nenhum produto encontrado. Tente outro termo ou categoria.</div>';buttons.forEach(b=>b.classList.toggle('active',b.dataset.filter===active))}buttons.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;render()}));if(search)search.addEventListener('input',render);render()}
document.addEventListener('DOMContentLoaded',()=>{pnInitMenu();pnRenderCategories('#home-categories');pnRenderProducts('#featured-products',PN_PRODUCTS.slice(0,4));pnInitCatalog()});
