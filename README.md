# Manacá Viagens

Site institucional e painel de conteúdo moderno desenvolvido com Next.js 15 e Payload CMS 3. Consulte [MANACA_VIAGENS_CONTEXT.md](MANACA_VIAGENS_CONTEXT.md) para o briefing, fontes e decisões de conteúdo.

## Desenvolvimento

```bash
npm install
npm run seed          # Popula o banco local SQLite com os dados institucionais e admin
npm run dev           # Inicia o servidor local Next.js + Payload CMS (http://localhost:3000)
npm run build         # Gera o build de produção e prerenderiza páginas estáticas
npm run start         # Inicia o servidor de produção
```

### Painel Administrativo (Payload CMS)

- URL local: `http://localhost:3000/admin`
- O seed **não gera credenciais públicas padrão**. Para criar o primeiro usuário, defina `PAYLOAD_ADMIN_EMAIL` e `PAYLOAD_ADMIN_PASSWORD` no ambiente privado do CMS.
- **Coleções disponíveis:**
  - `Destinos`: gestão completa de destinos, resumo, imagem, conteúdo e rascunhos.
  - `Posts`: gestão do Diário da Manacá (blog).
  - `Media`: upload e organização de imagens e arquivos.
  - `Institucional` (Global): textos institucionais, história, fundadora, benefícios, etapas e canais de contato.

## Mídias do site original

Cópias locais recuperadas para desenvolvimento em 08/11/2026, sem depender de hotlink:

- [Vídeo da página inicial](https://manacaviagens.com/wp-content/uploads/2026/09/video-novo-jane.mp4): `public/media/video-novo-jane.mp4` (aproximadamente 66 MB); usado como fundo decorativo do hero, com controle de pausa e alternativa estática para movimento reduzido. É necessário revisar conteúdo, acessibilidade, legenda/transcrição e otimização antes de publicar.
- [Logo usada no cabeçalho do site original](https://manacaviagens.com/wp-content/uploads/2026/09/ChatGPT-Image-1-de-set.-de-2026-17_54_25.png): `public/media/logo-original.png`; arquivo isolado indicado pelo HTML do site original. Confirme autoria, licença e versão oficial com a proprietária antes de publicar.
- [Flor](https://manacaviagens.com/wp-content/uploads/2026/09/jane.png): `public/media/flor.png`, exibida na seção sobre o nome da marca.
- [Chapada Diamantina](https://manacaviagens.com/wp-content/uploads/2026/10/chapada_diamantina_manaca.jpeg): `public/media/chapada.jpeg`.
- [Serra da Mantiqueira](https://manacaviagens.com/wp-content/uploads/2026/10/Imagem-do-ChatGPT-9-de-out.-de-2026-20_53_37-1.jpg): `public/media/mantiqueira.jpg`; o nome do arquivo original não comprova autoria ou licença.
- [Retrato de Adjane](https://manacaviagens.com/wp-content/uploads/2026/10/IMG-20240822-WA0161.jpg): `public/media/adjane.jpg`.

As mídias foram autorizadas para desenvolvimento; confirme autoria, licença e autorização de imagem antes da publicação. Os banners e infográficos com texto rasterizado não foram usados como interface. A inspeção não estabelece um inventário completo do WordPress; obtenha os arquivos originais e valide as alternativas e a identidade visual com a proprietária.

## Antes da publicação

Confirme canais de contato, conteúdo, identidade visual e direitos. Não há formulário ou integração de contato, sitemap, deploy ou redirecionamentos configurados. Audite backup, URLs e tráfego do WordPress antes de decidir os conflitos em `/contato/` e `/destinos/`. Não altere DNS ou WordPress sem autorização e validação de migração.

## Fontes de conteúdo e contatos

Em 08/11/2026 foram inspecionados visualmente o [infográfico de benefícios](https://manacaviagens.com/wp-content/uploads/2026/10/Consultoria_de_Viagens_Sob_Medida-1.jpeg) e o [infográfico da jornada](https://manacaviagens.com/wp-content/uploads/2026/10/Jornada-de-Viagem-Personalizada.png). Os quatro benefícios e as cinco etapas foram transcritos em `src/data/institucional.json` e apresentados como texto HTML na página de consultoria. A introdução da homepage e a descrição da consultoria reproduzem textos da [home original](https://manacaviagens.com/) e da [página original de serviços](https://manacaviagens.com/destinos/), respectivamente.

O [rodapé original em imagem](https://manacaviagens.com/wp-content/uploads/2026/10/Rodape-Elegante-Manaca-Viagens-5-1.png) mostra WhatsApp (71) 98623-3609, Instagram manacaviagens e e-mail manacaviagens1@hotmail.com. Não foram encontrados links desses canais no HTML das páginas consultadas; os endereços `wa.me`, Instagram e `mailto:` foram construídos a partir dos dados exibidos, sem verificar a titularidade ou o funcionamento dos canais. Confirme todos os contatos e a disponibilidade do suporte durante a viagem com a proprietária antes de publicar. A configuração do CMS ainda não foi testada na interface hospedada.

## Atualização da branch Payload com a main (21/11/2026)

A migração mantém o Next.js/Payload e incorpora os ajustes recentes aprovados na versão Astro: título institucional e textos da home, mensagem de Quem Somos, fonte mobile de 44 px, sobreposição de contraste dos destinos, modo claro, logomarca do rodapé e seção "O que você recebe" na consultoria.

Os contatos confirmados ficam em `src/data/contato.json` e são inicializados no Global Institucional do Payload. O widget de WhatsApp da versão Next.js permite digitar uma mensagem antes de redirecionar. Instagram permanece não confirmado e não é exposto no conteúdo inicial.

**Limitação provisória:** o GitHub Pages recebe somente a exportação estática. O painel `/admin` e as APIs do Payload não estão hospedados no Pages; para editar e publicar em produção será necessário um servidor Next.js/Payload com banco persistente e mídia/backup configurados. O seed do build estático cria uma base temporária e não representa uma sincronização de conteúdo do CMS em produção.

A pipeline da branch executa apenas validação, sem deploy no site público. O workflow de `main` gera `out/` com Next.js em vez do antigo `dist/` do Astro.

**Segurança:** configure `PAYLOAD_SECRET`, `DATABASE_URI`, `PAYLOAD_ADMIN_EMAIL` e `PAYLOAD_ADMIN_PASSWORD` apenas no ambiente seguro do futuro CMS. Não reutilize credenciais demonstrativas antigas. Evite executar `npm run seed` repetidamente contra o banco de produção, pois ele atualiza conteúdo institucional e posts de exemplo.

## Deploy estático via GitHub Actions (SSH)

O workflow [`.github/workflows/deploy-ssh.yml`](.github/workflows/deploy-ssh.yml) executa `npm run check` e `npm run build:static` para gerar a exportação estática em `out/` e sincroniza os arquivos via `rsync` sobre SSH em hospedagem compartilhada ou servidor estático (Nginx, Apache, LiteSpeed). Ele roda em `push` para `main` e manualmente via `workflow_dispatch` (com opção `dry_run`), mantendo o workflow de GitHub Pages ([`.github/workflows/pages.yml`](.github/workflows/pages.yml)) funcionando em paralelo.

### Configurações obrigatórias (Secrets ou Variables)

Configure em **Settings → Secrets and variables → Actions** (ou no Environment `production`). `SSH_PRIVATE_KEY` (e `SSH_PASSPHRASE`, quando houver) devem ser sempre **Secrets**; `SSH_HOST`, `SSH_USER` e `SSH_TARGET_DIR` podem ser **Secrets** ou **Variables**:

| Nome | Descrição |
|---|---|
| `SSH_HOST` | Endereço ou IP do servidor SSH |
| `SSH_USER` | Usuário SSH com permissão de escrita no diretório web |
| `SSH_PRIVATE_KEY` | Chave privada SSH dedicada ao deploy (formato PEM/OpenSSH, não `.ppk`, com ou sem passphrase) |
| `SSH_TARGET_DIR` | Caminho remoto de destino (ex.: `/var/www/manacaviagens` ou `/home/usuario/domains/homolog.manacaviagens.com/public_html`) |

### Secrets e Variables opcionais

| Nome | Tipo | Padrão | Descrição |
|---|---|---|---|
| `SSH_PASSPHRASE` | Secret | *(vazio)* | Senha (passphrase) da chave privada, obrigatória caso a chave tenha sido gerada com senha (ex.: pelo gerador do cPanel) |
| `SSH_PORT` | Secret ou Variable | `22` (fallback `2222`) | Porta SSH; se não for informada (e `SSH_KNOWN_HOSTS` estiver vazio), o workflow testa `22` e depois `2222` (padrão cPanel) |
| `SSH_KNOWN_HOSTS` | Secret ou Variable | *(vazio)* | Saída de `ssh-keyscan -p <PORTA> <HOST>` para fixar a identidade do servidor |
| `SSH_BASE_PATH` | Variable | `""` | Prefixo de subdiretório caso o site não fique na raiz do domínio (ex.: `/previa`) |
| `PAYLOAD_SECRET` | Secret | *(fallback estático)* | Segredo usado apenas durante o seed temporário do build estático |
| `ALLOW_WORDPRESS_OVERWRITE` | Variable | `false` | Trava de segurança que aborta o deploy se encontrar `wp-config.php`, `wp-includes` ou `wp-admin` no destino |

### Preparação da chave SSH e primeiro teste

**Pelo cPanel (gerando chave com senha):**
1. Em **Segurança → Acesso SSH → Gerenciar chaves SSH → Gerar uma nova chave**, crie a chave com uma senha forte.
2. Na lista **Chaves públicas**, clique em **Gerenciar → Autorizar**.
3. Em **Chaves privadas**, clique em **Exibir/Baixar** (copie a chave PEM/OpenSSH `-----BEGIN ... PRIVATE KEY-----`, **não** o arquivo `.ppk`), salve na secret `SSH_PRIVATE_KEY` e salve a senha na secret `SSH_PASSPHRASE`.

**Ou pelo terminal (chave sem senha):**

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f deploy_key -N ""
```

1. Importe `deploy_key.pub` no servidor (`~/.ssh/authorized_keys` ou **Importar chave → Autorizar** no cPanel) e salve `deploy_key` na secret `SSH_PRIVATE_KEY`.
2. Opcionalmente, capture a assinatura do host com `ssh-keyscan -p <PORTA> <HOST>` e salve em `SSH_KNOWN_HOSTS`.
3. Na aba **Actions** do GitHub, execute primeiro **Deploy Static Site via SSH → Run workflow** com a opção `dry_run` marcada para conferir os arquivos sem alterar o servidor.

> **Aviso de migração e SEO:** `src/app/(site)/layout.tsx` mantém `robots: { index: false, follow: false }` durante a fase de validação. Não aponte o deploy para o diretório do WordPress em produção nem altere DNS antes de fazer backup completo e decidir a estratégia das rotas em conflito (`/contato/` e `/destinos/`).
