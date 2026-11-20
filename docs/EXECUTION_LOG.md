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

### Próximo passo único — conectar/preparar Supabase
Antes de prosseguir, precisamos confirmar se o usuário já possui um projeto Supabase para este sistema.

O usuário precisa:
1. Abrir ou criar um projeto em https://supabase.com/dashboard.
2. Informar apenas se o projeto já existe ou se precisa criar um.
3. Não enviar senha, chave service-role, token ou segredo pelo chat.
4. Quando chegar a etapa de configuração, inserir as variáveis diretamente nos painéis oficiais, seguindo instruções guiadas.

Ainda não executar a migration até confirmar o projeto correto e revisar as políticas RLS em ambiente de teste.

## Pendências gerais

- Confirmar projeto Supabase.
- Aplicar e testar migration/RLS.
- Configurar autenticação e papéis.
- Construir painel administrativo.
- Construir portal do fornecedor Body Burn.
- Definir método autorizado de importação de catálogo Body Burn (API/feed/CSV).
- Confirmar autorização e credenciais oficiais para integração Mercado Livre.
- Implementar pedidos, estoque, precificação, auditoria e homologação.
- Verificar branch de deploy no Netlify antes de qualquer publicação.

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
