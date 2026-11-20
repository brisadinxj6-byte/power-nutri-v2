# POWER NUTRI HUB — Arquitetura inicial

**Status:** fundação arquitetural  
**Branch:** `feature/power-nutri-hub-foundation`

## 1. Objetivo

Construir um ERP web em nuvem para administrar a operação Power Nutri com a Body Burn Distribuidora como fornecedora e um marketplace como canal de vendas.

O sistema terá dois perfis:
- **Administrador Power Nutri:** acesso integral a produtos, preços, margens, canais, pedidos, relatórios e configurações.
- **Fornecedor Body Burn:** acesso restrito ao portal do fornecedor para catálogo, estoque, confirmação e expedição dos pedidos.

## 2. Decisão comercial pendente

A opção "marketplace" foi escolhida, mas o canal exato e o tipo de integração ainda precisam ser confirmados:
- Mercado Livre como vendedor (conta de vendedor e anúncios próprios); ou
- outro marketplace.

Links de afiliado não equivalem a uma integração de vendedor/dropshipping. O site atual contém links de afiliado/redirecionamento para o Mercado Livre. Essa vitrine não deve ser convertida automaticamente em fluxo de pedidos próprios sem confirmar a modalidade, a conta e as permissões de API.

## 3. Componentes

- **Frontend Power Nutri:** vitrine e experiência do comprador.
- **Painel administrativo:** catálogo, precificação, canais, pedidos, clientes e relatórios.
- **Portal do fornecedor:** acesso separado e restrito para a Body Burn.
- **Backend/API:** regras de negócio, integrações, validações e webhooks.
- **Supabase:** PostgreSQL, autenticação, armazenamento e políticas de acesso.
- **Netlify:** hospedagem do frontend e, se adequado, funções serverless.
- **Adaptadores de marketplace:** camada isolada por canal. Nenhum endpoint ou credencial será presumido antes de confirmar a plataforma e a autorização.

## 4. Fluxo operacional

1. Body Burn importa ou atualiza seu catálogo no portal.
2. O backend valida SKU, custo, preço, estoque, imagens e data da atualização.
3. O motor de preço calcula preço sugerido usando custo, taxas do canal, frete subsidiado (quando aplicável), impostos/custos e margem mínima configurada.
4. A sincronização automática atualiza o banco central e registra um histórico.
5. O adaptador publica/atualiza anúncios somente após a integração oficial ser configurada e validada.
6. O marketplace envia eventos de pedido por webhook ou consulta autorizada.
7. O Hub registra o pedido uma única vez e encaminha os itens ao fornecedor.
8. O fornecedor confirma separação, despacho, nota fiscal conforme fluxo fiscal acordado e rastreamento.
9. O Hub atualiza o canal e o comprador com os eventos permitidos.

## 5. Módulos do MVP

1. Autenticação e permissões (admin/fornecedor).
2. Catálogo de produtos e SKUs.
3. Importação de planilha CSV/XLSX como primeiro mecanismo de entrada, caso não exista API/feed autorizado.
4. Estoque e histórico de sincronização.
5. Regras de preço e margem mínima.
6. Pedidos e estados operacionais.
7. Portal do fornecedor para confirmação e rastreamento.
8. Auditoria, logs e alertas.

## 6. Modelo de dados inicial

- `profiles`: usuário, papel e estado de acesso.
- `suppliers`: fornecedores e configurações operacionais.
- `products`: SKU interno, nome, marca, descrição, categoria, imagens e estado.
- `supplier_products`: SKU do fornecedor, custo, estoque, disponibilidade e atualização.
- `channel_listings`: canal, ID externo, SKU, preço publicado, estado e sincronização.
- `price_rules`: taxas, custos adicionais e margem mínima por canal/categoria.
- `inventory_events`: mudanças de estoque com origem e horário.
- `orders`: ID externo, canal, comprador minimizado ao necessário, totais e estado.
- `order_items`: produto, SKU, quantidade, custo e preço vendido registrados no momento da venda.
- `fulfillments`: confirmação, expedição, transportadora e rastreamento.
- `sync_runs`: execução, resultado, contagem, erros e origem.
- `audit_logs`: ator, ação, entidade e horário.

## 7. Regras de segurança e integridade

- Credenciais e tokens de marketplace ficam apenas no backend, nunca no navegador.
- Acesso ao portal do fornecedor limitado por políticas de banco e autorização no servidor.
- Toda sincronização deve ser idempotente: reprocessar o mesmo evento não pode duplicar produto, estoque ou pedido.
- Alterações de preço e estoque geram histórico.
- Não publicar preço abaixo do piso configurado.
- Não anunciar produto sem SKU identificável e disponibilidade válida.
- Webhooks devem ser autenticados e deduplicados.
- Logs não devem expor senhas, tokens ou dados pessoais desnecessários.

## 8. Sincronização automática

A preferência definida é automática. A implementação será por etapas:
- importar catálogo/estoque por API ou feed autorizado, se a Body Burn disponibilizar;
- enquanto isso, permitir importação de planilha no portal;
- executar validação antes de aplicar atualizações;
- manter histórico, alertas de falha e data da última sincronização.

A frequência e o formato da fonte serão configurados após confirmação técnica com a Body Burn. Não será feito scraping não autorizado do site do fornecedor.

## 9. Estados de pedido

`aguardando_pagamento` → `pago` → `enviado_ao_fornecedor` → `confirmado_fornecedor` → `em_separacao` → `despachado` → `entregue`

Estados alternativos: `cancelado`, `falha_no_fornecedor`, `devolucao_solicitada`, `devolvido`, `reembolsado`.

A transição para `pago` depende de confirmação confiável do marketplace ou do provedor de pagamento. Não confiar apenas no retorno do navegador.

## 10. Fases de implementação

- **Fase 0 — Fundação:** arquitetura, repositório, ambiente, modelo de dados e segurança.
- **Fase 1 — Portal e catálogo:** autenticação, produtos, importação de planilhas e estoque.
- **Fase 2 — Precificação e sincronização:** custos, margens, logs, atualizações automáticas.
- **Fase 3 — Marketplace:** autenticação oficial, anúncios, pedidos, webhooks e sincronização de status.
- **Fase 4 — Operação e IA:** relatórios, alertas, descrições assistidas e análises.

## 11. Dependências a confirmar antes da integração de vendas

- Marketplace escolhido e modalidade de conta (vendedor, não afiliado).
- Acesso autorizado à API e requisitos de homologação.
- Fonte de catálogo Body Burn (API, feed ou planilha), SKU e frequência.
- Regras escritas de preço, estoque, despacho, nota fiscal, cancelamento e devolução.
- Responsabilidade fiscal e documental validada com contador.
