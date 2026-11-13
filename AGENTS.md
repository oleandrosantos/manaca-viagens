# Orientações para agentes

- Leia `MANACA_VIAGENS_CONTEXT.md` antes de alterar o projeto; distinga fatos observados, propostas e itens a confirmar. Preserve o arquivo de contexto.
- O site usa Astro com saída estática, TypeScript strict e Tailwind. Prefira HTML semântico, acessível e responsivo, com JavaScript apenas quando necessário.
- Não invente preços, pacotes, avaliações, certificações, dados legais ou contatos. Confirme canais de contato, autoria e licença de imagens antes de publicá-los.
- Pages CMS e Cloudflare Workers são objetivos futuros, não integrações já validadas. Não inclua segredos no repositório.
- O briefing aponta conflitos entre rotas antigas e conteúdo proposto. Audite e decida a migração antes de implementar redirecionamentos; não crie regras contraditórias.
- Execute `npm run check` e `npm run build` após mudanças relevantes. Documente limitações e falhas de validação.
- Não publique nem altere DNS ou o WordPress sem autorização e validação de migração.

- Priorize sempre os textos originais escritos pela cliente, preservando sua redação e significado; use propostas editoriais apenas quando necessárias e identifique sua origem no inventário. Evite duplicação excessiva e mantenha o conteúdo editável no CMS.
