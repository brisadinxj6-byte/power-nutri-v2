document.addEventListener('DOMContentLoaded',()=>{
 const grid=document.querySelector('#offers-products');
 const search=document.querySelector('#offer-search');
 const brand=document.querySelector('#offer-brand');
 const category=document.querySelector('#offer-category');
 if(!grid)return;
 function render(){
  const q=(search.value||'').trim().toLocaleLowerCase('pt-BR');
  const b=brand.value;
  const c=category.value;
  const items=PN_PRODUCTS.filter(p=>
   (b==='todas'||p.brand===b)&&
   (c==='todas'||p.category===c)&&
   (p.name+' '+p.brand+' '+p.desc).toLocaleLowerCase('pt-BR').includes(q)
  );
  grid.innerHTML=items.length?items.map(pnCard).join(''):'<div class="empty-state">Nenhuma oferta encontrada com esses filtros.</div>';
 }
 [search,brand,category].forEach(el=>el.addEventListener(el===search?'input':'change',render));
 render();
});