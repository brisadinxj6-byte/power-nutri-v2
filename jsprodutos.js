// DADOS DOS PRODUTOS COM LINKS DE AFILIADO
const produtos = [
    {
        id: 1,
        nome: "Whey Protein - Integralmedica",
        categoria: "whey",
        descricao: "Proteína de soro isolada alta qualidade",
        preco: "89,90",
        emoji: "💪",
        linkAfiliado: "https://meli.la/1JdTWc3",
        destaque: true,
        marca: "Integralmedica"
    },
    {
        id: 2,
        nome: "Creatina Monohidratada - Dark Lab",
        categoria: "creatina",
        descricao: "Força, resistência e ganho muscular",
        preco: "34,90",
        emoji: "⚡",
        linkAfiliado: "https://meli.la/2L324Yk",
        destaque: true,
        marca: "Dark Lab"
    },
    {
        id: 3,
        nome: "Pré-Treino - Black Skull",
        categoria: "pretreino",
        descricao: "Energia, foco e desempenho",
        preco: "79,90",
        emoji: "🔥",
        linkAfiliado: "https://meli.la/2kYg5QK",
        destaque: true,
        marca: "Black Skull"
    },
    {
        id: 4,
        nome: "BCAA - Growth",
        categoria: "bcaa",
        descricao: "Aminoácidos essenciais para recuperação",
        preco: "49,90",
        emoji: "🏋️",
        linkAfiliado: "https://meli.la/1T9AST8",
        destaque: true,
        marca: "Growth"
    },
    {
        id: 5,
        nome: "Hipercalórico - Soldiers",
        categoria: "hipercalorico",
        descricao: "Ganho de massa muscular acelerado",
        preco: "59,90",
        emoji: "💥",
        linkAfiliado: "https://meli.la/1JvXZfN",
        destaque: false,
        marca: "Soldiers"
    },
    {
        id: 6,
        nome: "Vitaminas e Cápsulas",
        categoria: "vitaminas",
        descricao: "Suplementação completa",
        preco: "39,90",
        emoji: "💊",
        linkAfiliado: "https://meli.la/18D5Gf2",
        destaque: false,
        marca: "Vários"
    }
];

// LINKS DE AFILIADO POR CATEGORIA
const linksCategorias = {
    "whey": "https://meli.la/1JdTWc3",
    "creatina": "https://meli.la/2L324Yk",
    "pretreino": "https://meli.la/2kYg5QK",
    "bcaa": "https://meli.la/1T9AST8",
    "vitaminas": "https://meli.la/18D5Gf2",
    "hipercalorico": "https://meli.la/1JvXZfN",
    "emagrecimento": "https://meli.la/2aH3YLi",
    "recuperacao": "https://meli.la/2naxtDX",
    "combos": "https://meli.la/2GNMcKK",
    "acessorios": "https://meli.la/2Duq8Ln",
    "promocao": "https://meli.la/1ESKEHW",
    "vitrine": "https://meli.la/1Ej1VzE"
};

// DADOS DO BLOG
const artigos = [
    {
        id: 1,
        titulo: "Guia Completo de Whey Protein",
        categoria: "Guia de Suplementos",
        data: "2024-01-15",
        resumo: "Tudo que você precisa saber sobre whey protein: tipos, benefícios e como escolher a melhor.",
        conteudo: `
            <h3>O que é Whey Protein?</h3>
            <p>Whey Protein é uma proteína derivada do soro do leite, rica em aminoácidos essenciais. É uma das formas mais eficientes de suplementação proteica para quem treina.</p>
            
            <h3>Tipos de Whey Protein</h3>
            <p><strong>Whey Protein Concentrado:</strong> Contém 70-80% de proteína, mais carboidratos e gordura.</p>
            <p><strong>Whey Protein Isolado:</strong> Contém 90%+ de proteína, menor teor de carboidratos e gordura.</p>
            <p><strong>Whey Protein Hidrolisado:</strong> Proteína pré-digerida, absorção mais rápida.</p>
            
            <h3>Benefícios</h3>
            <ul>
            <li>Recuperação muscular pós-treino</li>
            <li>Aumento de síntese proteica</li>
            <li>Ganho de massa muscular</li>
            <li>Fácil digestão</li>
            </ul>
            
            <h3>Como Escolher</h3>
            <p>Considere seus objetivos, orçamento e preferências de sabor. Se busca máxima pureza, escolha isolado. Se quer melhor relação custo-benefício, concentrado é excelente.</p>
        `,
        produtosRelacionados: [1],
        linkAfiliado: "https://meli.la/1JdTWc3"
    },
    {
        id: 2,
        titulo: "Creatina: Mito ou Realidade?",
        categoria: "Entenda os Ingredientes",
        data: "2024-01-10",
        resumo: "Descubra a verdade sobre creatina, seus benefícios comprovados e como usar corretamente.",
        conteudo: `
            <h3>O que é Creatina?</h3>
            <p>Creatina é um composto naturalmente produzido pelo corpo, encontrado principalmente nos músculos. Já está presente em alimentos como carne vermelha.</p>
            
            <h3>Benefícios Comprovados</h3>
            <ul>
            <li>Aumento de força e potência</li>
            <li>Melhora na resistência</li>
            <li>Ganho de massa muscular</li>
            <li>Desempenho cognitivo aprimorado</li>
            </ul>
            
            <h3>Segurança</h3>
            <p>Creatina é segura quando usada corretamente. Estudos científicos confirmam sua eficácia há mais de 20 anos.</p>
            
            <h3>Como Usar</h3>
            <p>Dose recomendada: 3-5 gramas ao dia. Não necessita fase de carregamento. Consuma com carboidratos para melhor absorção.</p>
        `,
        produtosRelacionados: [2],
        linkAfiliado: "https://meli.la/2L324Yk"
    },
    {
        id: 3,
        titulo: "Pré-Treino: Vale a Pena?",
        categoria: "Como Escolher",
        data: "2024-01-05",
        resumo: "Análise honesta sobre pré-treino, seus componentes e se realmente faz diferença.",
        conteudo: `
            <h3>O Que Contém Pré-Treino</h3>
            <p>Pré-treino tipicamente contém cafeína, beta-alanina, citrulina e outros estimulantes para melhorar o desempenho.</p>
            
            <h3>Benefícios Reais</h3>
            <ul>
            <li>Maior energia durante o treino</li>
            <li>Melhor foco e concentração</li>
            <li>Aumento de bomba muscular</li>
            <li>Redução de fadiga</li>
            </ul>
            
            <h3>Considerações Importantes</h3>
            <p>Nem todos respondem igual. Cafeína pode causar dependência. Se sensível, comece com meia dose.</p>
            
            <h3>Quando Tomar</h3>
            <p>Consuma 20-30 minutos antes do treino, com carboidratos para melhor absorção.</p>
        `,
        produtosRelacionados: [3],
        linkAfiliado: "https://meli.la/2kYg5QK"
    },
    {
        id: 4,
        titulo: "BCAA vs Whey: Qual Escolher?",
        categoria: "Dúvidas Frequentes",
        data: "2023-12-28",
        resumo: "Comparação entre BCAA e Whey Protein: diferenças, benefícios e qual é melhor para você.",
        conteudo: `
            <h3>BCAA - O que é?</h3>
            <p>BCAA (Aminoácidos de Cadeia Ramificada) são 3 aminoácidos essenciais: leucina, isoleucina e valina.</p>
            
            <h3>Whey Protein - O que é?</h3>
            <p>Whey é uma proteína completa com todos os 9 aminoácidos essenciais, incluindo BCAA.</p>
            
            <h3>Comparação</h3>
            <table>
            <tr><td>BCAA</td><td>Rápida absorção, específico para recuperação</td></tr>
            <tr><td>Whey</td><td>Completo, maior aporte proteico, versátil</td></tr>
            </table>
            
            <h3>Qual Escolher?</h3>
            <p>Se seu orçamento é limitado, Whey Protein é melhor. Se quer máxima recuperação, combine ambos.</p>
        `,
        produtosRelacionados: [1, 4],
        linkAfiliado: "https://meli.la/1T9AST8"
    }
];
