# Manacá Viagens

Site institucional estático em Astro. Consulte [MANACA_VIAGENS_CONTEXT.md](MANACA_VIAGENS_CONTEXT.md) para o briefing, fontes e decisões pendentes.

## Desenvolvimento

```bash
npm ci
npm run dev
npm run check
npm run build
npm run format:check
npm run preview
```

O build é gerado em `dist/`. As rotas atuais são propostas, ainda sem decisão de migração. O site permanece com `noindex`.

## Edição com Pages CMS

A configuração `.pages.yml` descreve a página inicial e os benefícios e etapas da consultoria (`src/data/institucional.json`), destinos (`src/content/destinos/*.md`) e artigos (`src/content/blog/*.md`). O texto de cada destino e artigo é Markdown; as demais seções institucionais ainda são editadas no código. A configuração segue a [documentação oficial de conteúdo](https://pagescms.org/docs/configuration/content/), [nomes de arquivo](https://pagescms.org/docs/configuration/content/filename/) e [mídia](https://pagescms.org/docs/configuration/media/).

Para usar a interface hospedada, disponibilize o repositório no GitHub, acesse [Pages CMS](https://app.pagescms.org/), entre com GitHub e instale o aplicativo no repositório conforme o [guia oficial](https://pagescms.org/docs/quick-start/). Esta conexão e a interface real ainda não foram testadas. Alterações são gravadas no repositório; um novo build é necessário para aparecerem no site. Não há deploy automático configurado.

Crie um destino ou artigo, informe os campos obrigatórios e o texto, e mantenha **Rascunho** ativo até a revisão. Rascunhos não são incluídos nas listagens nem nas páginas geradas, mas continuam acessíveis a quem puder ler o repositório: não armazene conteúdo confidencial nele. Desative o rascunho e gere novamente o site para publicar no build. O nome do arquivo determina a URL; renomeá-lo altera a rota e exige avaliar redirecionamento. A data organiza artigos, mas não agenda sua publicação. Imagens enviadas ao CMS ficam em `public/media/` e são referenciadas por `/media/`; informe descrição alternativa significativa. O CMS não valida direitos ou conteúdo.

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
