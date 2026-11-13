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
- Usuário inicial padrão gerado pelo seed:
  - **E-mail:** `admin@manacaviagens.com.br`
  - **Senha:** `admin-manaca-2026`
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
