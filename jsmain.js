// FUNCIONALIDADES DO SITE

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    renderizarDestaques();
});

function renderizarDestaques() {
    const container = document.getElementById('destaques-container');
    if (!container) return;

    const destaquesArray = produtos.filter(p => p.destaque);
    
    container.innerHTML = destaquesArray.map(produto => `
        <div class="produto-card">
            <div class="produto-imagem">${produto.emoji}</div>
            <div class="produto-info">
                <div class="produto-categoria">${produto.marca}</div>
                <div class="produto-nome">${produto.nome}</div>
                <div class="produto-desc">${produto.descricao}</div>
                <div class="produto-preco">R$ ${produto.preco}</div>
                <a href="${produto.linkAfiliado}" target="_blank" class="produto-btn">
                    Consultar Oferta
                </a>
                <div style="font-size: 11px; color: #999; margin-top: 8px;">🔗 Link de afiliado</div>
            </div>
        </div>
    `).join('');
}

function renderizarCatalogo(filtro = null) {
    const container = document.getElementById('catalogo-container');
    if (!container) return;

    let produtosFiltrados = produtos;
    if (filtro) {
        produtosFiltrados = produtos.filter(p => p.categoria === filtro);
    }

    container.innerHTML = produtosFiltrados.map(produto => `
        <div class="produto-card">
            <div class="produto-imagem">${produto.emoji}</div>
            <div class="produto-info">
                <div class="produto-categoria">${produto.marca}</div>
                <div class="produto-nome">${produto.nome}</div>
                <div class="produto-desc">${produto.descricao}</div>
                <div class="produto-preco">R$ ${produto.preco}</div>
                <a href="${produto.linkAfiliado}" target="_blank" class="produto-btn">
                    Consultar Oferta
                </a>
                <div style="font-size: 11px; color: #999; margin-top: 8px;">🔗 Link de afiliado</div>
            </div>
        </div>
    `).join('');
}

function filtrarPorCategoria(categoria) {
    const botoesAtivos = document.querySelectorAll('.filtro-btn');
    botoesAtivos.forEach(btn => btn.classList.remove('active'));
    
    if (categoria && event) {
        event.target.classList.add('active');
        renderizarCatalogo(categoria);
    } else {
        renderizarCatalogo();
    }
}

function renderizarBlog() {
    const container = document.getElementById('blog-container');
    if (!container) return;

    container.innerHTML = artigos.map(artigo => `
        <article class="artigo">
            <h2>${artigo.titulo}</h2>
            <div class="artigo-meta">
                ${artigo.categoria} • ${new Date(artigo.data).toLocaleDateString('pt-BR')}
            </div>
            <p>${artigo.resumo}</p>
            <a href="blog.html?id=${artigo.id}" style="color: #cc0000; font-weight: bold;">
                Ler mais →
            </a>
        </article>
    `).join('');
}

function renderizarArtigoCompleto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
        renderizarBlog();
        return;
    }

    const artigo = artigos.find(a => a.id == id);
    if (!artigo) {
        renderizarBlog();
        return;
    }

    const container = document.getElementById('artigo-completo');
    if (!container) return;

    const produtosRelacionadosHTML = artigo.produtosRelacionados
        .map(prodId => {
            const prod = produtos.find(p => p.id === prodId);
            return `
                <div class="produto-card" style="max-width: 200px;">
                    <div class="produto-imagem">${prod.emoji}</div>
                    <div class="produto-info">
                        <div class="produto-categoria">${prod.marca}</div>
                        <div class="produto-nome" style="font-size: 14px;">${prod.nome}</div>
                        <div class="produto-preco">R$ ${prod.preco}</div>
                        <a href="${prod.linkAfiliado}" target="_blank" class="produto-btn">
                            Consultar
                        </a>
                    </div>
                </div>
            `;
        })
        .join('');

    container.innerHTML = `
        <article>
            <h1>${artigo.titulo}</h1>
            <div class="artigo-meta">
                ${artigo.categoria} • ${new Date(artigo.data).toLocaleDateString('pt-BR')}
            </div>
            <div class="artigo-conteudo">
                ${artigo.conteudo}
            </div>
            
            <hr style="margin: 48px 0; border: 1px solid #2d2d2d;">
            
            <h3>Produtos Relacionados</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 24px;">
                ${produtosRelacionadosHTML}
            </div>
            
            <hr style="margin: 48px 0; border: 1px solid #2d2d2d;">
            
            <div style="background: #2d2d2d; padding: 24px; border-radius: 8px; margin: 32px 0;">
                <p style="font-size: 12px; color: #999;">
                    💡 <strong>Aviso de Afiliado:</strong> Este artigo contém links de afiliado. 
                    Podemos receber uma comissão por compras elegíveis realizadas através desses links, 
                    sem custo adicional para você.
                </p>
            </div>
            
            <a href="blog.html" class="btn btn-secondary" style="margin-top: 24px;">
                ← Voltar ao Blog
            </a>
        </article>
    `;
}

// Analytics básico
function rastrearClique(categoria) {
    if (window.gtag) {
        gtag('event', 'clique_afiliado', {
            'categoria': categoria
        });
    }
}
