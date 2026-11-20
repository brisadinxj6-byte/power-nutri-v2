# Power Nutri Hub — registro de execução

Este arquivo é o ponto de continuidade do projeto. Ao concluir cada etapa, atualizar este registro e os documentos/configurações versionáveis no GitHub antes de avançar.

## Regras de trabalho acordadas

1. Trabalhar em etapas pequenas, uma por vez.
2. Não iniciar a etapa seguinte até validar a atual.
3. Ao concluir cada etapa, registrar: objetivo, alterações, arquivos/commits, testes, resultado e pendências.
4. Manter documentação e configurações não secretas no GitHub.
5. Nunca gravar senhas, tokens, chaves privadas, dados pessoais de compradores ou credenciais neste repositório.
6. Informar antecipadamente o que o usuário precisa fornecer ou configurar.
7. Preservar a vitrine pública atual e trabalhar no branch de desenvolvimento até a homologação.
8. Registrar aqui um resumo técnico das decisões e do progresso de cada sessão. Este registro não é uma cópia integral das conversas privadas do ChatGPT.

## Identificação

- Repositório: `brisadinxj6-byte/power-nutri-v2`
- Branch de trabalho: `feature/power-nutri-hub-foundation`
- Site público informado: `https://power-nutri-v2.netlify.app`

## Estado atual — 2026-11-20

### Etapa 0 — levantamento e preservação
- Estado: levantamento inicial realizado; validação de deploy/Netlify ainda pendente.
- A vitrine existente foi preservada.
- Não foi alterada a branch principal.

### Etapa 1 — fundação de banco e segurança
- Estado: arquivos de fundação versionados; ainda não aplicados nem testados num projeto Supabase.
- Migration: `supabase/migrations/202611200001_initial_schema.sql`
- Plano técnico: `docs/POWER_NUTRI_HUB_IMPLEMENTATION.md`
- README atualizado.
- Commits desta etapa:
  - Migration: `4da9cf2aa8112a4447c4d7a3f06d13b459844076`
  - Documentação: `261d99744faca5a956a2f7fc21502bd8048daa0d`
  - README: `3d6c5d6a051ce4f4be961e38cf03d668abfa3a2a`

### Etapa 2 — projeto Supabase criado
- Estado: projeto criado e exibido como Healthy no painel.
- Nome exibido: `netflixfull1991-Projeto de depuração`.
- Project ref: `oizglhttuzecwjuzdfih`.
- Região observada: West US (Oregon), identificador `us-west-2`.
- URL pública do projeto: `https://oizglhttuzecwjuzdfih.supabase.co`.
- Decisão operacional: manter este projeto como ambiente de desenvolvimento para evitar criar/apagar recursos sem necessidade. A região não pode ser alterada in-place; caso a latência/região brasileira se torne requisito, criar outro projeto e migrar antes de produção.
- O painel mostrou “No repository connected”. A conta GitHub conectada ao ChatGPT não significa que o repositório já esteja ligado à integração GitHub do Supabase.
- A conexão GitHub do Supabase ainda precisa ser habilitada em Project Settings > Integrations > GitHub Integration, escolhendo o repositório `brisadinxj6-byte/power-nutri-v2` e o diretório de trabalho `.`.
- Nenhuma migration foi aplicada. Nenhuma credencial ou segredo foi copiado para o GitHub/chat.

### Próximo passo
- Habilitar a integração GitHub no painel Supabase e conectar `brisadinxj6-byte/power-nutri-v2`, branch `feature/power-nutri-hub-foundation` se a interface permitir selecionar branch; diretório de trabalho `.`.
- Depois revisar a migration e políticas RLS, então aplicar em desenvolvimento e testar.

## Pendências gerais

- Conectar GitHub ao projeto pela integração própria do Supabase.
- Aplicar e testar migration/RLS.
- Configurar autenticação e papéis.
- Construir painel administrativo.
- Construir portal do fornecedor Body Burn.
- Definir método autorizado de importação de catálogo Body Burn (API/feed/CSV).
- Confirmar autorização e credenciais oficiais para integração Mercado Livre.
- Implementar pedidos, estoque, precificação, auditoria e homologação.
- Verificar branch de deploy no Netlify antes de qualquer publicação.



### Etapa 3 — primeira interface isolada do Hub
- Estado: estrutura visual inicial criada na pasta `hub/`; não conectada ao banco e não publicada em produção.
- Arquivos adicionados:
  - `hub/index.html`: navegação e telas de visão geral, produtos, fornecedores, pedidos, importação, precificação e integrações.
  - `hub/hub.css`: layout responsivo e identidade visual própria.
  - `hub/hub.js`: navegação entre módulos e pré-visualização local de CSV (sem upload, sem gravação).
- Segurança/limites: a interface informa que não há dados operacionais conectados; nenhum pedido, estoque ou métrica fictícia é apresentado como real. A vitrine raiz não foi alterada.
- Commits:
  - HTML: `72b973405440b2102dacdf5c20db4ce8937270ca`
  - CSS: `ef4a984d516680df4daa269fd29899b90cbbc45c`
  - JavaScript: `d93f2bdf1741c3666c8c098fcf4742aedfb68f76`
- Testes: revisão estática do conteúdo e dos caminhos; teste de navegador/build ainda não executado. Supabase continua sem conexão confirmada e a migration não foi aplicada.
- Próxima etapa: validar a interface em ambiente de preview e implementar o catálogo administrativo depois de conectar/testar o banco e autenticação.

## Modelo de atualização por etapa

Para cada etapa concluída, registrar:
- Data:
- Objetivo:
- O que foi feito:
- Arquivos alterados:
- Commit(s):
- Testes executados e resultado:
- O que falta:
- O que o usuário precisa fazer/fornecer:
- Próxima etapa autorizada:
