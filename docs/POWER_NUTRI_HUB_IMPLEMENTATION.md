# POWER NUTRI HUB — plano de implementação e operação

## Estado real do repositório

- Repositório: https://github.com/brisadinxj6-byte/power-nutri-v2
- Branch de trabalho: `feature/power-nutri-hub-foundation`
- Site público informado: https://power-nutri-v2.netlify.app
- O conteúdo existente é uma vitrine estática/afiliada do Mercado Livre. Ele foi preservado.
- O Hub será construído em módulos separados; a vitrine pública não deve ser substituída durante a fundação do ERP.
- O branch `main` é o branch padrão do GitHub. As alterações desta fase ficam somente na branch de desenvolvimento.

## Objetivo de produto

Transformar a operação em uma estrutura de vendedor próprio no Mercado Livre, com catálogo central, gestão de custos e estoque, processamento de pedidos e portal restrito do fornecedor Body Burn. A existência de API/integração da Body Burn e a autorização de vendedor/API do Mercado Livre ainda precisam ser confirmadas. Nenhuma integração externa deve ser marcada como ativa antes de um teste autenticado real.

## Arquitetura planejada

- Aplicação web: área administrativa e portal do fornecedor separados por rota e autorização.
- Backend: funções serverless Netlify para operações privilegiadas e webhooks; nunca expor tokens no navegador.
- Dados: Supabase PostgreSQL, Supabase Auth e Storage.
- Segurança: RLS no banco, papéis `admin` e `supplier`, validação no servidor e trilha de auditoria.
- Integrações: adaptadores independentes para Mercado Livre e Body Burn.
- Importação: CSV/XLSX como caminho de contingência caso o fornecedor não ofereça API/feed autorizado.

## Fases

### Fase 0 — preservação e levantamento
- [x] Confirmar repositório, permissões e branch de desenvolvimento.
- [x] Confirmar que a branch contém a vitrine existente e que o site deve ser preservado.
- [ ] Inspecionar e testar a publicação Netlify e os arquivos estáticos em execução.
- [ ] Confirmar a branch de deploy configurada no Netlify.

### Fase 1 — fundação de dados e segurança
- [x] Criar primeira migration PostgreSQL com perfis, fornecedores, catálogo, regras de preço, pedidos, eventos, sincronizações e auditoria.
- [x] Habilitar RLS e políticas iniciais de separação entre administrador e fornecedor.
- [ ] Aplicar migration em um projeto Supabase autorizado.
- [ ] Testar políticas RLS com contas reais de administrador e fornecedor.
- [ ] Configurar Auth, Storage e variáveis de ambiente sem versionar segredos.

### Fase 2 — painel e portal
- [ ] Login e recuperação de acesso.
- [ ] Dashboard alimentado exclusivamente por dados reais.
- [ ] CRUD de produtos, categorias, marcas e fornecedores.
- [ ] Portal do fornecedor limitado aos seus próprios produtos e eventos de pedido.

### Fase 3 — importação e precificação
- [ ] Importador CSV/XLSX com pré-visualização, validação e relatório de linhas rejeitadas.
- [ ] Idempotência por SKU/fornecedor e log de sincronização.
- [ ] Motor de preço com taxas configuráveis, piso de venda e margem estimada.

### Fase 4 — integrações
- [ ] Verificar com a Body Burn se há API, feed ou exportação autorizada.
- [ ] Implementar adaptador CSV se não houver integração estruturada.
- [ ] Configurar OAuth oficial do Mercado Livre após autorização do titular da conta.
- [ ] Webhooks, pedidos, envio e rastreamento com processamento idempotente.
- [ ] Não publicar anúncios nem executar operações financeiras reais sem validação expressa.

### Fase 5 — testes, publicação e manual
- [ ] Testes automatizados de regras de negócio, permissões e fluxos.
- [ ] Deploy de homologação separado do site de vitrine.
- [ ] Manual em português brasileiro.
- [ ] Checklist de produção, backups e recuperação.

## Variáveis de ambiente esperadas (não preencher com valores no Git)

Configurar no painel do Netlify/Supabase, nunca neste repositório:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (pode ser pública somente com RLS corretamente configurada)
- `SUPABASE_SERVICE_ROLE_KEY` (segredo exclusivo do backend)
- `MERCADO_LIVRE_CLIENT_ID`
- `MERCADO_LIVRE_CLIENT_SECRET`
- `MERCADO_LIVRE_REDIRECT_URI`
- `BODY_BURN_API_BASE_URL` (somente se o fornecedor confirmar API)
- `BODY_BURN_API_TOKEN` (somente se fornecido oficialmente)

## Regras de segurança e operação

1. Nunca incluir chaves privadas, tokens, senhas ou dados reais de compradores em commits.
2. Nunca confiar em preço/estoque enviado pelo navegador sem validação no backend.
3. Nunca marcar pedido como pago com base em retorno do frontend; validar no canal oficial.
4. Nunca permitir que usuário fornecedor consulte margem, financeiro ou pedidos de outro fornecedor.
5. Nunca atualizar estoque para número negativo nem publicar produto sem SKU/preço válido.
6. A migration é uma fundação inicial e precisa ser aplicada e testada em Supabase antes de ser considerada ativa.
7. O site de vitrine atual permanece preservado enquanto o Hub é desenvolvido em branch e diretório separados.

## Critério de conclusão

O projeto só está pronto para operação quando autenticação, RLS, catálogo, importação, precificação, fluxo de pedidos, integrações autorizadas, testes e publicação de homologação tiverem sido validados. Criar arquivos no GitHub não equivale a ativar serviços externos.
