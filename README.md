# Manacá Viagens

Primeira versão institucional local em Astro, com páginas de apresentação, consultoria, destinos, diário e contato. Consulte [MANACA_VIAGENS_CONTEXT.md](MANACA_VIAGENS_CONTEXT.md) para o briefing, as fontes e as decisões pendentes.

## Comandos

```bash
npm ci
npm run dev
npm run check
npm run build
npm run format:check
npm run preview
```

O build estático é gerado em `dist/`. Os grafismos de paisagem são composições CSS locais, não fotografias dos destinos. Os textos e a direção visual são propostas para revisão pela proprietária.

## Antes da publicação

Os canais de contato, identidade visual, conteúdo e direitos de uso de imagens devem ser confirmados. Não há formulário ou integração de contato, CMS, sitemap, deploy ou redirecionamentos configurados. As páginas estão com `noindex` enquanto o projeto é local. As rotas semânticas são propostas de navegação local, não uma decisão de migração: auditar backup, URLs e tráfego do WordPress antes de decidir os conflitos em `/contato/` e `/destinos/`. Não alterar DNS ou WordPress sem autorização e validação de migração.
