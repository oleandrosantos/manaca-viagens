import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'author', 'draft'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      label: 'Data de Publicação',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'Adjane Costa',
      label: 'Autor',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Resumo',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Conteúdo do Artigo (Rich Text)',
    },
    {
      name: 'draft',
      type: 'checkbox',
      defaultValue: false,
      label: 'Rascunho',
    },
  ],
}
