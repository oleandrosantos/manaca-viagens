import type { CollectionConfig } from 'payload'

export const Destinos: CollectionConfig = {
  slug: 'destinos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'region', 'slug', 'draft'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título do Destino',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
    },
    {
      name: 'region',
      type: 'text',
      required: true,
      label: 'Região',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Resumo',
    },
    {
      name: 'image',
      type: 'text',
      required: true,
      label: 'Caminho da Imagem (/media/...)',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Conteúdo do Destino (Rich Text)',
    },
    {
      name: 'draft',
      type: 'checkbox',
      defaultValue: false,
      label: 'Rascunho',
    },
  ],
}
