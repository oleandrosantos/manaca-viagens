# Manacá Viagens — Contexto mestre para reconstrução do site

> **Tipo de documento:** briefing de produto + inventário do legado + direção visual + especificação técnica + plano de migração + instruções para agente de IA  
> **Projeto:** migração de WordPress/Elementor para Astro + Pages CMS + Cloudflare Workers (static assets)  
> **Site de referência:** https://manacaviagens.com/  
> **Data da pesquisa:** 07/11/2026  
> **Idioma:** português brasileiro (`pt-BR`)  
> **Status:** pesquisa baseada em páginas e mídias publicamente acessíveis; não é um backup do WordPress nem uma captura integral de todos os estados visuais.

## 0. Como usar este arquivo com uma IA de desenvolvimento

Este documento deve servir como **fonte primária de contexto**, não como ordem para reproduzir problemas do legado. A IA deve:

1. **Ler todas as seções antes de implementar** e usar as URLs originais como fontes de referência.
2. Separar rigorosamente **[OBSERVADO]** (confirmado no site), **[PROPOSTO]** (direção de produto/design) e **[A CONFIRMAR]** (depende do proprietário).
3. Preservar a essência da marca, o conteúdo útil e as fotografias autorizadas; **não reproduzir a interface WordPress literalmente**.
4. Construir um site **static-first**, com **Astro + TypeScript**, conteúdos editáveis por **Pages CMS**, deployment em **Cloudflare Workers Static Assets** e versionamento GitHub.
5. Não inventar preços, pacotes comercializados, depoimentos, avaliações, certificações, CNPJ, endereço, políticas ou números de clientes.
6. Entregar interface acessível, mobile-first, performática, preparada para SEO e fácil de manter sem programação.
7. Tratar os dados de contato vistos em imagem como **sujeitos à confirmação antes da publicação**.
8. Antes de trocar o DNS, obter inventário/backup adicional do WordPress e validar rotas, imagens, conteúdo, redirecionamentos e domínio.

### Decisão de arquitetura

**MVP recomendado:** Astro prerenderizado + Tailwind CSS + TypeScript + Astro Content Collections + Pages CMS (GitHub-backed) + Cloudflare Workers Static Assets. **Não usar SSR por padrão**. Só acrescentar Worker/serviço de backend se um requisito real exigir (por exemplo, formulário próprio com envio server-side). É possível começar com CTA de WhatsApp/e-mail sem backend e sem banco de dados.

---

## 1. Resumo executivo e posicionamento da marca

### 1.1. O que a Manacá é — [OBSERVADO]

A Manacá Viagens se apresenta como uma **consultoria de viagens personalizadas**, com curadoria cuidadosa de destinos, hospedagens, passeios, trajetos e experiências. O discurso do site gira em torno de:

- Viagens planejadas segundo interesses, preferências, orçamento e ritmo da pessoa;
- Contato com a natureza, cultura, gastronomia e identidade local;
- Experiências autênticas, tranquilas, sem roteiros massificados;
- Planejamento que traz leveza, clareza e segurança à jornada;
- Simbolismo da flor **manacá-da-serra**: transformação, renovação, novos ciclos.

Há uma identificação nominal da fundadora, **Adjane Costa**, como *Travel Designer* e criadora da Manacá. O conteúdo público relata que seu interesse por organizar viagens começou em 2015, inicialmente para si e para a família. **Não converter essa data em 'fundada em 2015'**: são afirmações diferentes.

### 1.2. Proposta de valor editorial — [PROPOSTO]

**Mensagem central:** viagens únicas, planejadas com cuidado, para quem prefere descobrir cada lugar no próprio ritmo.

**Tom de voz:** acolhedor, sereno, sofisticado sem elitismo; natureza, sensibilidade e confiança; pouca urgência comercial; linguagem humana e clara; evitar clichês de 'promoções imperdíveis', 'menor preço' e escassez artificial.

**Frase de trabalho (não copiada do legado):** “Viaje no seu ritmo. Viva experiências que fazem sentido para você.”

**Públicos candidatos a validar:** pessoas que querem viagem sob medida, casais, famílias e viajantes interessados em natureza e experiências culturais. Não assumir especializações ou público exclusivo sem validação.

### 1.3. Objetivos do novo site — [PROPOSTO]

1. Apresentar claramente o serviço de consultoria e o que está incluído.
2. Construir confiança pela história da empresa e pela apresentação da fundadora.
3. Inspirar por meio de destinos e do **Diário da Manacá** (blog).
4. Converter visitas em conversas qualificadas via WhatsApp, e-mail e, opcionalmente, um briefing de viagem.
5. Permitir que a proprietária edite textos, imagens, destinos e artigos pelo Pages CMS.
6. Reduzir custos de hospedagem e dependências do WordPress/Elementor.
7. Corrigir navegação, conteúdo de exemplo e acessibilidade do site anterior.

---

## 2. Inventário do site atual — [OBSERVADO]

> **ATENÇÃO: inconsistência de URLs.** O texto dos itens do menu **não corresponde ao conteúdo** de alguns endereços. Esta relação foi verificada pelo conteúdo público extraído, mas recomenda-se confirmação visual adicional no navegador e auditoria do WordPress antes do cutover.

| URL pública observada | Conteúdo encontrado no levantamento | Interpretação | Estado |
|---|---|---|---|
| `https://manacaviagens.com/` | Página institucional com apresentação, proposta de consultoria, destinos e Diário da Manacá em captura recente; outra captura apontou para índice de blog WordPress | Home | Conteúdo divergente entre capturas; verificar página inicial configurada no WP |
| `https://manacaviagens.com/home-2/` | Redireciona para `/` | Home antiga/alias | Verificar 301/302 |
| `https://manacaviagens.com/contato/` | **Quem Somos**, história e apresentação de Adjane Costa | Página institucional | Slug incompatível com o conteúdo |
| `https://manacaviagens.com/destinos/` | **Serviços**, consultoria e processo | Serviço | Slug incompatível com o conteúdo |
| `https://manacaviagens.com/quem-somos/` | Texto padrão de página exemplo WordPress, em inglês | Placeholder | Não migrar texto padrão |
| `https://manacaviagens.com/servicos/` | **Blog**, com post padrão “Hello world!” | Placeholder | Não migrar post padrão |

### 2.1. Menu observado

- Home
- Quem Somos
- Serviços
- Contatos
- Blog

As URLs efetivamente associadas aos links acima, na captura consultada, foram `/home-2/`, `/contato/`, `/destinos/`, `/quem-somos/` e `/servicos/`, respectivamente. **Essa correspondência é um erro a reparar**, não um padrão a preservar.

### 2.2. Problemas e oportunidades levantados

- **P0: navegação/semântica de URLs:** rótulos e conteúdos desencontrados.
- **P0: conteúdo de demonstração público:** post “Hello world!” e página exemplo WordPress; eliminar do novo site.
- **P1: conteúdo textual embutido em imagens:** banners, etapas e rodapé são gráficos compostos com textos rasterizados; refazer com HTML semântico sobre imagens/fundos para responsividade, acessibilidade e indexação.
- **P1: SEO da homepage:** título observado “Manacá Viagens – A sua viagemmais que perfeita” contém problema de espaçamento; construir título/meta description profissional.
- **P1: experiência editorial:** permitir publicação de artigos, destinos e alteração de homepage pelo CMS, sem depender de Elementor.
- **P1: formulários e contato:** falta validar fluxo funcional de conversão, botões e destino de links.
- **P2: identidade visual:** existem rosas/lilases fortes e fotos de natureza, mas a composição pode ganhar escala tipográfica, grids, respiro, contraste e consistência visual.
- **P2: performance:** imagens de grandes dimensões requerem versionamento, compressão, dimensionamento, `srcset`/`sizes` e carregamento seletivo.

**Limitação da auditoria:** não foi possível capturar screenshots completos desktop/mobile nem inspecionar CSS computado, cabeçalhos HTTP, todos os plugins ativos, analytics, formulários, banco de dados, sitemap e configuração interna. Essas verificações continuam pendentes.

---

## 3. Mídias e referências visuais ORIGINAIS da Manacá — [OBSERVADO]

Os links abaixo apontam para arquivos públicos efetivamente encontrados no domínio atual. **Não são imagens geradas nem referências genéricas**. Eles são a parte mais importante da pesquisa visual e podem ser abertos pela IA ou pelo desenvolvedor.

| ID | Arquivo original / URL | O que mostra | Uso recomendado |
|---|---|---|---|
| V01 | [Flor manacá-da-serra, recorte circular](https://manacaviagens.com/wp-content/uploads/2026/09/jane.png) | Flor rosa/lilás/branca; nome e simbolismo da marca | Seção “Conheça a Manacá”, grafismo de marca |
| V02 | [Diagrama de benefícios da consultoria](https://manacaviagens.com/wp-content/uploads/2026/10/Consultoria_de_Viagens_Sob_Medida-1.jpeg) | Fundo pink/magenta, quatro colunas com ícones e benefícios | **Reconstruir em cards HTML**, não usar imagem com texto |
| V03 | [Fotografia — Chapada Diamantina](https://manacaviagens.com/wp-content/uploads/2026/10/chapada_diamantina_manaca.jpeg) | Montanhas, céu azul, vegetação; foto horizontal | Cards de destinos, detalhe de destino |
| V04 | [Fotografia — Serra da Mantiqueira](https://manacaviagens.com/wp-content/uploads/2026/10/Imagem-do-ChatGPT-9-de-out.-de-2026-20_53_37-1.jpg) | Campo, vegetação, árvores, céu; imagem horizontal | Cards de destinos, detalhe; **confirmar autoria/licença** |
| V05 | [Tarja lilás “Chapada Diamantina”](https://manacaviagens.com/wp-content/uploads/2026/10/banner_chapada_lilas_sem_bordas.jpeg) | Gradiente lilás com nome em fonte serifada | Extrair ideia de gradiente; recriar nome em HTML |
| V06 | [Tarja lilás “Serra da Mantiqueira”](https://manacaviagens.com/wp-content/uploads/2026/10/serra_da_mantiqueira_barra_sem_fundo_branco-1.png) | Gradiente lilás com tipografia serifada | Recriar com CSS e texto semântico |
| V07 | [Rodapé institucional com logotipo e contatos](https://manacaviagens.com/wp-content/uploads/2026/10/Rodape-Elegante-Manaca-Viagens-5-1.png) | Identidade rosa/lilás, logotipo, menu, redes, email, telefone, políticas | Fonte primária de paleta e logotipo; recriar rodapé em HTML |
| V08 | [Banner “Quem Somos”](https://manacaviagens.com/wp-content/uploads/2026/10/Quem-Somos-na-Floresta-Dourada-1-1.png) | Floresta iluminada pelo sol + título serifado branco | Referência para banner fotográfico com texto HTML |
| V09 | [Fotografia da fundadora em ambiente natural](https://manacaviagens.com/wp-content/uploads/2026/10/IMG-20240822-WA0161.jpg) | Retrato pessoal em local com vegetação | Apresentação da fundadora, com autorização |
| V10 | [Banner “Serviços”](https://manacaviagens.com/wp-content/uploads/2026/10/Servicos-na-Floresta-Dourada.png) | Mesmo conceito de V08, título serifado em branco | Hero interno; não repetir a mesma composição em todas as páginas |
| V11 | [Jornada de viagem personalizada](https://manacaviagens.com/wp-content/uploads/2026/10/Jornada-de-Viagem-Personalizada.png) | Gradiente claro, ícones e cinco etapas | **Recriar fluxo acessível com cinco etapas HTML** |

### 3.1. Pré-visualização de referências principais

**Marca, flor e identidade:**

![Manacá-da-serra: fotografia de referência da marca](https://manacaviagens.com/wp-content/uploads/2026/09/jane.png)

**Rodapé/logo original:**

![Rodapé atual com logotipo e cores da Manacá](https://manacaviagens.com/wp-content/uploads/2026/10/Rodape-Elegante-Manaca-Viagens-5-1.png)

**Banner de página interna:**

![Banner atual da seção Quem Somos, com floresta e título](https://manacaviagens.com/wp-content/uploads/2026/10/Quem-Somos-na-Floresta-Dourada-1-1.png)

**Paisagem do destino Chapada Diamantina:**

![Paisagem de Chapada Diamantina usada no site](https://manacaviagens.com/wp-content/uploads/2026/10/chapada_diamantina_manaca.jpeg)

**Processo apresentado no site antigo:**

![Infográfico da jornada de viagem personalizada](https://manacaviagens.com/wp-content/uploads/2026/10/Jornada-de-Viagem-Personalizada.png)

### 3.2. Leitura visual (sem captura de página completa)

- **Identidade cromática observada:** rosa-magenta vibrante; lavanda/lilás, ocasionalmente em gradiente; branco e preto; fotografias de natureza em tons verdes/terrosos.
- **Tipografia visual observada:** uso de serifadas em títulos institucionais/nomes de destinos e fontes sem serifa em textos pequenos dos infográficos.
- **Universo imagético:** flor de manacá, florestas, montanhas, horizontes, contemplação, luz natural, pessoas em ambientes naturais.
- **Logotipo:** lettering de “Manacá Viagens” em rosa/lilás, visível no **rodapé rasterizado** V07. **O arquivo vetorial original não foi encontrado** nesta auditoria. Solicitar SVG/AI/PDF ao proprietário; não redesenhar a marca arbitrariamente.
- **Problema de layout legado:** alguns elementos relevantes estão “pintados” dentro da imagem (rótulos, ícones, telefone, rodapé e textos). Para a nova versão, separar conteúdo/estilo para garantir atualização pelo CMS.

### 3.3. Direitos de uso e estratégia de mídia

Antes de copiar imagens para o novo repositório, validar autorização de uso, autoria, eventuais restrições de bancos de imagens e preferência da cliente. O nome de um arquivo inclui “ChatGPT”; **isso não prova proveniência nem licença de uso**. Preferir **arquivos originais** em alta qualidade, com metadados e alternativas de enquadramento. Não fazer hotlink permanente para WordPress: depois da validação, salvar cópias locais em `public/images/` ou em storage próprio, para retirar a dependência do site antigo.

---

## 4. Design system proposto — [PROPOSTO, não inferido como tokens oficiais]

### 4.1. Princípios

1. **Natureza com sofisticação:** editorial, orgânico, leve; evitar estética de marketplace de passagens aéreas.
2. **Fotografias protagonistas:** cenários reais e imagens de boa procedência; preservar ponto focal.
3. **Conversão gentil:** CTAs claros, mas não excessivos nem intrusivos.
4. **Textos vivos, nunca rasterizados:** títulos, nomes de destinos, etapas, contatos e legendas em HTML.
5. **Conteúdo editável:** detalhes de conteúdo separados de componentes de apresentação.
6. **Mobile-first:** navegação simples, cards responsivos, espaçamentos generosos e botões confortáveis.

### 4.2. Cores sugeridas (ponto de partida; **aproximações de projeto**, não amostras medidas)

```css
:root {
  --color-background: #FFFCFB;   /* off-white */
  --color-surface: #FFFFFF;
  --color-ink: #302736;          /* ameixa escura para leitura */
  --color-muted: #645D68;
  --color-brand: #9A287C;        /* magenta profundo para CTA com contraste */
  --color-brand-soft: #F5DBF1;   /* rosa suave */
  --color-lavender: #D9BEF4;
  --color-lavender-soft: #F5EFFB;
  --color-nature: #49624A;       /* verde apenas como apoio */
  --color-border: #E9DDEA;
}
```

**Regra:** conservar o pink/lilás como assinatura, mas usar tons mais profundos quando houver texto sobre fundo claro para atingir WCAG AA. Revisar as cores após obter a identidade oficial e testar contraste.

### 4.3. Tipografia sugerida

- Headings: serifada editorial com boa leitura (ex.: `DM Serif Display`, `Cormorant Garamond` ou equivalente aprovado) — definir apenas uma.
- Corpo/UI: sans neutra e legível (ex.: `Inter` ou `Manrope`) — definir apenas uma.
- Fontes **locais/subsetadas**, pesos restritos e `font-display: swap`; respeitar licença.
- H1 preferencialmente único por página, legibilidade sobre hero com overlay e tamanho responsivo via `clamp()`.

### 4.4. Componentes de interface

`SiteHeader`, `MobileMenu`, `Logo`, `Button`, `SectionHeading`, `PageHero`, `PhotoCard`, `DestinationCard`, `ServiceBenefit`, `TravelProcess`, `FounderStory`, `BlogCard`, `ContactCTA`, `WhatsAppLink`, `FAQAccordion` (apenas se houver FAQ real), `SiteFooter`, `Breadcrumbs`, `SEOHead`, `ImageWithCaption`.

**Regras UX:** largura máxima de conteúdo ~1120–1240px; leitura longa ~65–75ch; card grids 1/2/3 colunas por breakpoint; alvos de toque ≥44×44px; links sublinhados quando apropriado; menu mobile acessível e fechável por Escape; foco visível; carrosséis apenas se acrescentarem valor e com controle de movimento.

---

## 5. Arquitetura de informação alvo — [PROPOSTO]

### 5.1. Menu principal proposto

- **Início** → `/`
- **A Manacá** (Quem Somos) → `/quem-somos/`
- **Consultoria** (Serviços) → `/servicos/`
- **Destinos** → `/destinos/`
- **Diário da Manacá** → `/blog/`
- **Contato** → `/contato/` (ou CTA para WhatsApp)

Menu mobile com os mesmos destinos, sem duplicação de botões decorativos. CTA destacado: **“Planejar minha viagem”** ou **“Conversar sobre minha viagem”**. Validar linguagem comercial com a proprietária.

### 5.2. Páginas e requisitos

#### `/` — Homepage

**Objetivo:** comunicar o serviço em segundos e conduzir à descoberta/contato.

1. Header: logo, navegação, CTA.
2. Hero: fotografia de natureza relevante + headline de proposta de valor + texto objetivo + CTA primário (WhatsApp/briefing) e secundário (conhecer a consultoria).
3. Introdução à Manacá: significado do nome e abordagem humana, com V01.
4. Benefícios/atributos: compreensão do perfil, roteiro sob medida, curadoria, suporte; recriar V02 com ícones SVG e texto real.
5. “Como funciona”: processo de 5 etapas (ver §5.3), inspirar-se em V11.
6. Destinos de inspiração: Chapada Diamantina e Serra da Mantiqueira inicialmente, sem fingir inventário amplo.
7. Apresentação de Adjane Costa, com link para a página institucional.
8. Prévia de artigos do Diário da Manacá **quando existirem publicações reais**.
9. CTA final + rodapé completo.

#### `/quem-somos/` — Quem Somos / A Manacá

- Apresentar significado simbólico do manacá e os valores de transformação/renovação.
- Explicar que a consultoria orienta a experiência com sensibilidade, planejamento e cuidado.
- Apresentar **Adjane Costa** e sua trajetória, sem alegar certificações ou datas societárias não confirmadas.
- V08 como referência fotográfica, V09 como referência da foto pessoal (uso condicionado à autorização).
- CTA para entrar em contato.

#### `/servicos/` — Consultoria de viagens personalizada

- O que é a consultoria, qual problema resolve e quem se beneficia.
- **Escopo observado:** escolha do destino segundo perfil/expectativa; pesquisa de hospedagens; organização de experiências/passeios; orientação de transportes e deslocamentos; distribuição equilibrada do roteiro; consideração do orçamento; entrega organizada de informações.
- **Processo de 5 etapas:** conhecer, planejar, personalizar, refinar, entregar.
- Esclarecer o que **não está incluído** apenas após confirmação (não inferir emissão de passagens, reservas, acompanhamento operacional 24h ou preços).
- CTA com pergunta clara e contexto da consultoria.

#### `/destinos/` — Destinos e inspirações

- Listar destinos publicados pelo CMS; priorizar fotos e narrativa de experiência.
- Destinos observados: **Chapada Diamantina (BA)** e **Serra da Mantiqueira (região de SP/MG/RJ)**.
- Filtros por região/estilo de viagem só se forem úteis com a quantidade real de destinos; evitar UI vazia.
- Cards com imagem, título, texto de apresentação e link para detalhe.

#### `/destinos/[slug]/` — Detalhe de destino

- Hero fotográfico, descrição, atmosfera, possíveis experiências culturais/natureza, indicações editoriais qualificadas e CTA para consultoria.
- Não anunciar preço/roteiro comercial sem informação confirmada.
- Campos de SEO, imagem, alt, publicação, ordem e destaque no CMS.

#### `/blog/` e `/blog/[slug]/` — Diário da Manacá

- Listagem editorial com capa, categoria, título, resumo, data e leitura estimada opcional.
- Artigos completos em Markdown com heading structure, autoria identificada, fotos, alt, canonical, compartilhamento e relacionados por tema quando fizer sentido.
- **Não migrar o post padrão “Hello world!”**.
- Estado inicial vazio elegante caso não haja publicações reais.

#### `/contato/` — Contato / Planejar a viagem

- Opções WhatsApp, e-mail, Instagram e informações da empresa validadas.
- CTA com texto de abertura personalizado por contexto (homepage, consultoria, destino).
- Formulário opcional (nome, canal de contato, destino desejado, período, número de viajantes, orçamento aproximado **opcional**, observações e consentimento). Minimizar dados, incluir política de privacidade e antispam; não coletar documentos pessoais ou dados sensíveis no primeiro contato.
- Se optar por formulário, definir quem recebe, retenção e consentimento **antes** do desenvolvimento.

#### Páginas de conformidade

- `/politica-de-privacidade/`
- `/termos-de-uso/` se aplicável, aprovados pela responsável;
- `/404` com orientações úteis e navegação de retorno.

### 5.3. Jornada de consultoria observada na mídia V11

1. **Conhecemos você:** entender ritmo, interesses, expectativas e orçamento.
2. **Planejamos:** estruturar a jornada com os detalhes necessários.
3. **Personalizamos:** moldar a proposta segundo o perfil.
4. **Refinamos:** fazer ajustes antes da viagem.
5. **Entregamos:** disponibilizar roteiro/planejamento organizado.

No CMS, preferir etapas configuráveis (`title`, `description`, `iconKey`, `order`), com ícones locais mapeados em código, sem aceitar SVG arbitrário enviado por usuário.

---

## 6. Conteúdo existente — resumo editorial, não transcrição literal

> Os textos a seguir são **sínteses/paráfrases** do conteúdo público para orientar a reescrita. **Não representam exportação integral de páginas**, que deve ser obtida diretamente do WordPress com autorização.

### 6.1. Home

- Apresentação da flor Manacá como símbolo natural de metamorfose, ciclos e descobertas.
- Consultoria feita sob medida conforme gostos, ritmo e intenções do viajante.
- Destinos que valorizam natureza, cultura e o prazer de explorar sem correria.
- Blocos de apresentação de Chapada Diamantina e Serra da Mantiqueira.
- Área “Diário da Manacá” com a proposta de reunir inspirações e dicas de viagem.

### 6.2. Quem Somos

- Propósito de tornar viagens experiências significativas e personalizadas, respeitando a singularidade do viajante e do lugar.
- Cuidado do começo do planejamento ao retorno, com atenção aos detalhes.
- Adjane Costa, autora da iniciativa, relata experiência pessoal de planejamento de viagens iniciada em 2015.

### 6.3. Serviços

- Orientação para decisão de destinos, hospedagens, passeios, deslocamentos e orçamento.
- Consultoria dirigida a pessoas que valorizam experiências autênticas e organização sem rigidez.
- Equilíbrio entre planejamento estruturado e liberdade de viver o destino no próprio ritmo.

### 6.4. Destinos citados

- **Chapada Diamantina:** serras, cachoeiras, grutas, natureza, cozinha e cultura regionais; explorar com calma.
- **Serra da Mantiqueira:** paisagens montanhosas, araucárias, neblina, cafés, acolhimento e tranquilidade.

**Não inferir:** excursões com datas, venda de passagens, pacote fechado, preço, parcelamento, parceria com hotéis ou reserva online — isso **não foi comprovado**.

---

## 7. Dados institucionais observados no rodapé — [A CONFIRMAR]

Fonte: **imagem V07**, que contém os seguintes dados rasterizados. Todos devem ser confirmados antes da publicação e preferencialmente editáveis no CMS.

| Campo | Valor legível na imagem | Ação |
|---|---|---|
| Nome da marca | Manacá Viagens | Manter |
| WhatsApp/telefone | **(71) 98623-3609** | Confirmar titularidade, DDD e atendimento |
| Instagram | **manacaviagens** | Confirmar URL/perfil oficial; não presumir disponibilidade |
| E-mail | **manacaviagens1@hotmail.com** | Confirmar recebimento, uso institucional e eventual troca |
| Rodapé | © 2026 Manacá Viagens | Tornar ano dinâmico |
| Links legais | Política de Privacidade; Termos de Uso | Verificar se existem documentos efetivos; não publicar textos jurídicos genéricos sem revisão |

**WhatsApp:** após confirmação, formato internacional esperado para `wa.me` seria `5571986233609`; gerenciar em `site.json`, não espalhar literal nos componentes. Usar `encodeURIComponent` para mensagens contextualizadas e `rel="noopener noreferrer"` onde necessário.

**Aviso importante:** resultados de busca externa apresentam empresas homônimas “Manacá Viagens e Turismo” em outros estados. **Não associar CNPJ, endereços ou histórico jurídico de homônimos** à marca deste domínio sem validação documental da proprietária.

---

## 8. Estrutura técnica sugerida — [PROPOSTO]

```text
manaca-viagens/
├── .github/
│   └── workflows/            # CI, testes e, se necessário, deploy
├── .pages.yml                # configuração central Pages CMS
├── astro.config.mjs
├── wrangler.jsonc
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── brand/
│   │   ├── home/
│   │   ├── destinations/
│   │   ├── team/
│   │   └── blog/
│   ├── robots.txt            # se preferir estático; validar produção
│   └── _headers              # apenas se plataforma suportar e exigir; confirmar
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── marketing/
│   │   └── blog/
│   ├── content/
│   │   ├── blog/             # *.md, escrito no Pages CMS
│   │   └── destinations/     # *.md, escrito no Pages CMS
│   ├── content.config.ts     # Astro Content Collections, schema Zod
│   ├── data/
│   │   ├── site.json         # contatos, menus, SEO padrão, sociais
│   │   ├── home.json         # copy e seções da homepage
│   │   ├── about.json
│   │   ├── services.json
│   │   └── contact.json
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── quem-somos.astro
│   │   ├── servicos.astro
│   │   ├── destinos/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── contato.astro
│   │   ├── politica-de-privacidade.astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── seo.ts
│       ├── urls.ts
│       └── contact.ts
└── docs/
    └── CONTEXT.md             # cópia deste briefing
```

**Obs.:** a organização é uma sugestão, não uma exigência da API. Consultar APIs de Astro e Pages CMS das versões instaladas, especialmente interfaces de loaders/coleções e configuração de campos.

### 8.1. Modelo de conteúdo (contract entre CMS e frontend)

**`site.json`:** `brandName`, `siteUrl`, `defaultTitle`, `defaultDescription`, `logo`, `logoAlt`, `favicon`, `whatsappNumber`, `whatsappDefaultMessage`, `email`, `instagramUrl`, `primaryNavigation[]`, `footerNavigation[]`, `legalLinks[]`.

**`home.json`:** `hero{eyebrow,title,description,image,imageAlt,primaryCta,secondaryCta}`, `intro{title,body,image,imageAlt}`, `benefits[]`, `process[]`, `featuredDestinations[]`, `founderTeaser`, `blogTeaser`, `finalCta`.

**`about.json`:** `hero`, `story`, `values[]`, `founder{name,role,bio,image,imageAlt}`, `cta`.

**`services.json`:** `hero`, `intro`, `includedItems[]`, `process[]`, `audienceItems[]`, `faq[]`, `cta`.

**`contact.json`:** `hero`, `intro`, `channels[]`, `formEnabled` (desabilitado inicialmente), `faq[]`.

**`src/content/destinations/*.md`:** frontmatter `title`, `description`, `cover`, `coverAlt`, `region`, `tags[]`, `featured`, `order`, `draft`, `seoTitle`, `seoDescription`; body markdown.

**`src/content/blog/*.md`:** frontmatter `title`, `description`, `publishDate` (ISO), `updatedDate` opcional, `author`, `cover`, `coverAlt`, `category`, `tags[]`, `draft`, `seoTitle`, `seoDescription`; body markdown.

Definir limites e valores padrão; `alt` obrigatório para imagens informativas. Uma imagem puramente decorativa pode usar alt vazio, deliberadamente.

### 8.2. Exemplo funcional mínimo de `.pages.yml`

> O exemplo é **ponto de partida**, não schema completo do projeto. Os campos reais precisam ser alinhados às propriedades dos arquivos JSON/Markdown, e o PR deve testar edição + build ponta a ponta. Consultar https://pagescms.org/docs/configuration/.

```yaml
media:
  input: public/images
  output: /images
  rename: safe
  categories: [image]

content:
  - name: site
    label: Configurações do site
    type: file
    path: src/data/site.json
    fields:
      - name: brandName
        label: Nome da marca
        type: string
        required: true
      - name: siteUrl
        label: URL principal
        type: string
        required: true
      - name: defaultDescription
        label: Descrição padrão (SEO)
        type: text
      - name: logo
        label: Logotipo
        type: image
      - name: whatsappNumber
        label: Número de WhatsApp (internacional)
        type: string
      - name: email
        label: Email de contato
        type: string
      - name: instagramUrl
        label: Link do Instagram
        type: string

  - name: home
    label: Homepage
    type: file
    path: src/data/home.json
    fields:
      - name: hero
        label: Banner principal
        type: object
        fields:
          - name: title
            label: Título
            type: string
            required: true
          - name: description
            label: Descrição
            type: text
          - name: image
            label: Imagem de fundo
            type: image
          - name: imageAlt
            label: Descrição acessível da imagem
            type: string

  - name: destinations
    label: Destinos
    type: collection
    path: src/content/destinations
    fields:
      - name: title
        label: Destino
        type: string
        required: true
      - name: description
        label: Resumo
        type: text
        required: true
      - name: cover
        label: Imagem de capa
        type: image
      - name: coverAlt
        label: Texto alternativo
        type: string
      - name: featured
        label: Destacar na home
        type: boolean
      - name: draft
        label: Rascunho
        type: boolean
      - name: body
        label: Conteúdo
        type: rich-text
        options:
          format: markdown

  - name: blog
    label: Diário da Manacá
    type: collection
    path: src/content/blog
    fields:
      - name: title
        label: Título
        type: string
        required: true
      - name: description
        label: Resumo
        type: text
      - name: publishDate
        label: Data de publicação
        type: date
      - name: cover
        label: Capa
        type: image
      - name: coverAlt
        label: Texto alternativo
        type: string
      - name: draft
        label: Rascunho
        type: boolean
      - name: body
        label: Artigo
        type: rich-text
        options:
          format: markdown
```

**Validações:** confirmar que o Pages CMS da versão usada grava o `body` no corpo do `.md`, e frontmatter nos demais campos; complementar campos de SEO/categorias/serviços e arquivos únicos após primeiro teste. **Não guardar segredos** no Pages CMS ou em arquivos públicos; se houver integrações com token, usar Secrets no Cloudflare/GitHub. Para imagens, o `output` é caminho público e o `input` é pasta do repositório, não uma storage bucket implícita.

### 8.3. Exemplo de `wrangler.jsonc` para site 100% estático

```jsonc
{
  "name": "manaca-viagens",
  "compatibility_date": "2026-11-07",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

**Notas:** nessa configuração não há `main` nem necessidade de `@astrojs/cloudflare`, pois o Astro pré-renderiza arquivos estáticos. Se futuramente existir SSR/Worker, rever a configuração conforme documentação oficial. O deploy pode ocorrer por Workers Builds conectado ao GitHub ou via GitHub Actions com `wrangler deploy`; **escolher um mecanismo**, evitando pipelines duplicados.

### 8.4. Comandos iniciais de referência

```bash
# Criar projeto Astro e seguir prompts adequados ao repositório
npm create astro@latest manaca-viagens
cd manaca-viagens

# Dependências de desenvolvimento/integrações conforme necessidade
npx astro add tailwind
npx astro add sitemap
npm i -D wrangler

# Desenvolvimento e validação
npm run dev
npm run build
npx wrangler deploy
```

**Importante:** os comandos são guia, não execução realizada. Verificar versões das integrações e Tailwind atual (sem copiar setup legado). Após criar o repo, conectar `https://app.pagescms.org/` ao GitHub e instalar a GitHub App com **acesso somente ao repositório necessário**; conceder permissões editoriais com critério.

### 8.5. Critérios técnicos

- Renderização estática e mínima hidratação; JS só para interações reais.
- Sem banco de dados para páginas/artigos/destinos do MVP.
- Content Collections com schema Zod e falha de build em conteúdo inválido.
- Sempre trabalhar com URL canônica e com domínio final `https://manacaviagens.com/`.
- Página 404 funcional e sem indexação.
- Não armazenar PII em logs, analytics ou URL de formulário.
- Pipeline: lint/format, `astro check`, testes básicos, build, smoke tests em preview e deploy da `main`.
- Renovação de mídias: reduzir peso (WebP/AVIF quando adequado) e aplicar tamanhos responsivos sem perder qualidade.
- Se houver formulário server-side, validar campos e origem, impor rate limit, Turnstile, tratamento seguro de segredos, erro/feedback e política de dados.

---

## 9. SEO e migração do WordPress — [PROPOSTO]

### 9.1. Inventário ANTES de desligar o WordPress

1. Exportar WordPress XML e, se possível, backup completo de banco e `wp-content/uploads/`.
2. Exportar URLs com fonte original de verdade (sitemap, Search Console, crawl completo e banco de dados).
3. Medir tráfego e indexação por URL, inclusive aliases e páginas com backlinks.
4. Preservar `title`, descrição, conteúdos e data real dos artigos válidos.
5. Inventariar mídia, licença, alt text, legendas, Open Graph e referências externas.
6. Confirmar nomes/canonical e possíveis variantes com e sem barra final, www/sem-www, HTTP/HTTPS.
7. Verificar tags de GA/GTM/Pixel antes de portar; atender consentimento, quando aplicável.

### 9.2. Mapa de rotas proposto (decisões SEO a validar)

| URL atual | Conteúdo atual observado | Canonical proposto | Decisão |
|---|---|---|---|
| `/` | Home (capturas divergentes) | `/` | Nova homepage |
| `/home-2/` | Alias da Home | `/` | 301, após validar |
| `/contato/` | Quem Somos | `/quem-somos/` | **Conflito:** no novo projeto `/contato/` passa a ser Contato. Auditar rankings/backlinks antes de reutilizar este caminho |
| `/destinos/` | Serviços | `/servicos/` | **Conflito:** no novo projeto `/destinos/` terá destinos; auditar antes de reutilizar |
| `/quem-somos/` | Exemplo padrão | `/quem-somos/` | Substituir placeholder por institucional real |
| `/servicos/` | Blog padrão | `/servicos/` | Substituir placeholder por consultoria |
| `/blog/` | Não confirmado como rota atual | `/blog/` | Criar listagem editorial |
| Outras URLs | Não inventariadas | Definir 1:1 | Exigir crawl/backups antes do corte |

**Decisão crítica:** não é possível aplicar redirecionamento 301 de `/contato/` para `/quem-somos/` **e** ter a nova página de contato em `/contato/` simultaneamente. O mesmo vale para `/destinos/`. Duas estratégias possíveis:

- **A (normalização semântica, recomendada se tráfego legado for baixo):** usar novas rotas corretas e responder 200 nos caminhos canônicos; aceitar mudança temática nos dois caminhos problemáticos depois da análise de impacto.
- **B (preservação SEO máxima):** manter os antigos caminhos com 301 para o conteúdo equivalente e escolher novos slugs sem conflito (ex.: `/fale-conosco/` em vez de `/contato/`, `/inspiracoes/` em vez de `/destinos/`). Definir a partir de dados de Search Console.

**Nunca criar regras de redirect contraditórias ou assumir que um 301 compensa conteúdo errado.**

### 9.3. Regras SEO

- Metadados únicos por página, social cards OG/Twitter, `canonical` absoluto correto, sitemap XML e robots coerentes.
- `@astrojs/sitemap` com `site` correto e filtragem de drafts.
- Sem `noindex` em produção; em preview, impedir indexação.
- Heading hierarchy consistente, breadcrumb em páginas internas quando útil, textos alternativos para imagens informativas.
- JSON-LD `Organization` ou `TravelAgency` (subtipo de `LocalBusiness`) com **apenas informações verificadas**, sem avaliações ou endereços fictícios.
- Boas páginas de destinos com conteúdo realmente útil, evitando thin content ou blocos genéricos repetidos.
- Imagens com dimensões definidas, lazy loading abaixo da dobra, preload do recurso LCP apenas quando justificável.
- URLs amigáveis, data em ISO no conteúdo, dates reais, política de atualização.
- Validar Search Console após publicação e revisar eventuais 404/soft 404.

---

## 10. Acessibilidade, desempenho, privacidade e segurança — [PROPOSTO]

### Acessibilidade

- WCAG 2.2 AA como alvo; contraste mínimo para texto, controles e indicadores de foco.
- HTML semântico (`header`, `nav`, `main`, `article`, `section`, `footer`).
- Skip link, navegação por teclado, `aria-expanded` em menu, Escape para fechar, foco manejado.
- `prefers-reduced-motion`; nunca depender só de animação para transmitir informação.
- Imagens de banners **não devem conter os textos importantes gravados nelas**.
- Formulários com labels, erros acessíveis, feedback de submissão e ordem de tabulação natural.

### Desempenho

- Metas iniciais: Lighthouse Performance/Accessibility/SEO >= 90 no mobile em condições controladas; CWV de campo LCP <= 2,5s, INP <= 200ms, CLS <= 0,1 no p75 quando houver volume suficiente.
- Não tratar pontuação de Lighthouse como garantia absoluta; medir em dispositivos reais.
- Imagens hero otimizadas e dimensionadas, fontes poucas, evitar sliders pesados, bibliotecas grandes e JS global desnecessário.
- Verificar cache de assets com hashes e configuração compatível com Workers Static Assets.

### LGPD e segurança

- Se usar Analytics, Clarity, cookies de marketing ou pixel, inventariar finalidades, consentimento/legítimo interesse quando cabível e política de privacidade.
- Minimizar dados em contato; não expor endereços de email em logs ou segredos em repositório.
- No Pages CMS, usar permissões de menor privilégio para GitHub App e editoras.
- Branch protection e revisões opcionais, equilíbrio com a autonomia editorial.
- Testar rollback do último deploy e preservar acesso ao backup WordPress antes de desligar hospedagem anterior.

---

## 11. Plano de implementação por fases — [PROPOSTO]

### Fase 0 — Auditoria e ativos

- [ ] Confirmar domínio e propriedade do projeto/repositório.
- [ ] Fazer backup completo do WordPress e arquivos de mídia.
- [ ] Obter logotipo original em vetor/alta resolução e manual da marca, se houver.
- [ ] Confirmar telefone, Instagram, email, foto e texto institucional com a cliente.
- [ ] Capturar screenshots integrais de todas as páginas em desktop (1440px) e mobile (390px), incluindo menu aberto e rodapé.
- [ ] Extrair lista real de URLs, títulos e mídias do WP e Search Console.
- [ ] Definir estratégia de preservação SEO para URLs em conflito.

### Fase 1 — Fundação visual e técnica

- [ ] Configurar Astro, TypeScript strict, Tailwind, formatter/linter, build.
- [ ] Implementar tokens visuais e tipografia.
- [ ] Criar BaseLayout, header, menu responsivo, CTA, footer, SEOHead, 404.
- [ ] Configurar `site.json`, `home.json` e schema de coleções.
- [ ] Montar homepage com conteúdo real/sintetizado aprovado.
- [ ] Garantir Core Web Vitals e acessibilidade básica.

### Fase 2 — Conteúdo institucional

- [ ] Página A Manacá/Quem Somos com fundadora.
- [ ] Página Consultoria/Serviços com inclusões, jornada e CTA.
- [ ] Destinos e detalhes (Chapada Diamantina e Serra da Mantiqueira).
- [ ] Contato e canal de conversão.
- [ ] Migrar imagens licenciadas para mídia própria, com alt text.

### Fase 3 — CMS editorial

- [ ] Criar `.pages.yml` com campos da marca, home, sobre, serviços, contatos, destinos e blog.
- [ ] Configurar GitHub App Pages CMS e permissões.
- [ ] Validar edição de texto/imagem/destino/artigo no CMS, commit, build e preview.
- [ ] Validar rascunhos, publicação e exclusão sem gerar 404 inesperado.
- [ ] Treinar proprietária e documentar o fluxo em 1 página.

### Fase 4 — Publicação e migração

- [ ] Preview acessível em subdomínio de staging com `noindex`.
- [ ] Validar responsividade, links, formulários, WhatsApp, social, emails, OG, sitemap.
- [ ] Publicar em Cloudflare Workers e conectar domínio personalizado.
- [ ] Configurar redirecionamentos testados e medir erros 404.
- [ ] Conferir DNS, HTTPS, Search Console, Analytics e logs.
- [ ] Fazer rollback se houver regressão; só cancelar hospedagem WordPress após estabilização.

### Fase 5 — Evolução opcional

- [ ] Briefing de viagem estruturado com proteção antispam e fluxo de consentimento.
- [ ] FAQ e artigos inspiracionais reais para SEO.
- [ ] Galeria de destinos e trilhas editoriais quando houver conteúdo suficiente.
- [ ] Depoimentos **somente com permissão e autenticidade confirmadas**.
- [ ] Integrações operacionais (CRM, email, calendários) **apenas com demanda real**.

---

## 12. Critérios de aceite do MVP

Um desenvolvedor/agente só pode considerar o MVP concluído quando:

1. O projeto tem `npm run build` limpo, sem hardcoded secrets e com tipagem válida.
2. A home comunica que se trata de **consultoria personalizada**, e não apenas revenda genérica de passagens.
3. Navegação desktop/mobile funciona, com URLs semanticamente coerentes e sem placeholder.
4. Contatos estão confirmados e botões funcionam, sem resultados enganosos.
5. É possível editar **home, site settings, destinos e blog** pelo Pages CMS e ver o resultado publicado após deploy.
6. Destinos reais iniciais: Chapada Diamantina e Serra da Mantiqueira; sem inventar pacotes/preços.
7. Textos antes presentes em banners/infográficos agora são conteúdo HTML acessível.
8. Blog não publica “Hello world!”; drafts ficam ocultos.
9. Há `title`, `description`, `canonical`, OG e sitemap adequados, política de rastreamento definida.
10. Imagens têm consentimento/licença, alt/dimensões e boa performance.
11. Mobile 390px e desktop 1440px foram inspecionados, assim como teclado e focus states.
12. Plano de migração das URLs antigas foi escolhido **após** auditoria e executado sem loops.
13. Projeto publicado em Cloudflare com acesso protegido a segredos e processo de rollback.
14. Proprietária consegue editar e publicar conteúdo sem abrir código no IDE.

---

## 13. Prompt pronto para colar em uma IA de desenvolvimento

> **Tarefa:** reconstrua integralmente o site institucional da Manacá Viagens em Astro + TypeScript + Tailwind CSS, com conteúdo gerenciável pelo Pages CMS e hospedagem estática em Cloudflare Workers. Leia primeiro `MANACA_VIAGENS_CONTEXT.md` como especificação e siga as URLs de referências originais citadas ali. Preserve a marca, os temas flor Manacá/natureza e o posicionamento como consultoria de viagens sob medida. Modernize a interface para um visual editorial acolhedor, acessível e responsivo, sem copiar os defeitos do WordPress antigo. Implemente homepage, Quem Somos, Consultoria, Destinos (listagem e detalhe), Blog (listagem e artigo), Contato e 404. Modele configurações e páginas institucionais em JSON editável e destinos/artigos em Markdown por Astro Content Collections e Pages CMS. Não invente serviços, preços, reviews, CNPJ, endereço ou dados não verificados. Use como referências visuais os URLs originais V01–V11; reconstrua títulos, fluxos, rodapé e infográficos em HTML/CSS, não em imagem com texto. Entregue código modular, `.pages.yml` testável, documentação de setup, build, deploy, SEO, checklist de acessibilidade e plano de redirecionamentos. **Não faça cutover de DNS nem desligue o WordPress sem backup e aprovação.** Ao final, mostre screenshots mobile/desktop, resultados dos testes e uma lista objetiva das pendências que exigem confirmação do proprietário.

---

## 14. Fontes e documentação consultadas

### Website original da Manacá (fontes primárias)

- Home: https://manacaviagens.com/
- Home/alias: https://manacaviagens.com/home-2/
- Conteúdo institucional sob `/contato/`: https://manacaviagens.com/contato/
- Conteúdo de serviços sob `/destinos/`: https://manacaviagens.com/destinos/
- Placeholder WP sob `/quem-somos/`: https://manacaviagens.com/quem-somos/
- Blog com placeholder sob `/servicos/`: https://manacaviagens.com/servicos/
- Referências de mídia V01–V11: links na seção 3.

### Documentação técnica oficial

- Astro no Cloudflare Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Astro no Cloudflare (documentação Astro): https://docs.astro.build/en/guides/deploy/cloudflare/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Astro loader `glob()`: https://docs.astro.build/en/reference/content-loader-reference/
- Pages CMS — quick start: https://pagescms.org/docs/quick-start/
- Pages CMS — configuração: https://pagescms.org/docs/configuration/
- Pages CMS — content: https://pagescms.org/docs/configuration/content/
- Pages CMS — media: https://pagescms.org/docs/configuration/media/
- Pages CMS — object field: https://pagescms.org/docs/configuration/fields/object/
- Pages CMS — image field: https://pagescms.org/docs/configuration/fields/image/
- Pages CMS — rich-text field: https://pagescms.org/docs/configuration/fields/rich-text/

### Limites do levantamento (honestidade metodológica)

- Conteúdo: extraído das páginas públicas e dos arquivos de imagem identificados; alguns textos foram resumidos e não transcritos.
- Visual: **arquivos visuais reais identificados**, mas não capturas completas de páginas em dispositivos diferentes.
- Técnica: não houve acesso ao wp-admin, exportação do WordPress, CSS/HTML integral via DevTools, dados de performance de campo, DNS/CDN, Search Console ou painel Cloudflare.
- WP REST API, sitemap e robots não puderam ser examinados de maneira confiável neste levantamento; executar diretamente na fase 0.
- Links externos de mídia devem ser novamente validados e os ativos autorizados devem ser armazenados no novo projeto antes de desligar o WP.

---

**Fim do contexto mestre.**
