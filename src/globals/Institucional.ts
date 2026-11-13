import type { GlobalConfig } from 'payload'

export const Institucional: GlobalConfig = {
  slug: 'institucional',
  label: 'Informações Institucionais',
  fields: [
    {
      name: 'heroEyebrow',
      type: 'text',
      label: 'Hero - Sobretítulo',
      defaultValue: 'CONSULTORIA DE VIAGENS PERSONALIZADAS',
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Hero - Título Principal',
      defaultValue: 'O mundo é vasto. O seu jeito de viajar é único.',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero - Descrição',
      defaultValue:
        'Viagens pensadas com cuidado, para quem prefere descobrir cada lugar no próprio ritmo.',
    },
    {
      name: 'introTitle',
      type: 'text',
      label: 'Introdução - Título',
      defaultValue: 'Uma viagem começa muito antes da partida.',
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Introdução - Texto',
    },
    {
      name: 'founderText',
      type: 'textarea',
      label: 'Apresentação da Fundadora',
    },
    {
      name: 'destinosTexto',
      type: 'textarea',
      label: 'Apresentação dos Destinos',
    },
    {
      name: 'diarioTexto',
      type: 'textarea',
      label: 'Apresentação do Diário',
    },
    {
      name: 'nomeTexto',
      type: 'array',
      label: 'Origem do Nome (parágrafos)',
      fields: [
        {
          name: 'paragrafo',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'historiaTexto',
      type: 'array',
      label: 'História da Manacá (parágrafos)',
      fields: [
        {
          name: 'paragrafo',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'adjaneTexto',
      type: 'array',
      label: 'História de Adjane (parágrafos)',
      fields: [
        {
          name: 'paragrafo',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'beneficios',
      type: 'array',
      label: 'Benefícios da Consultoria',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título do Benefício',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Descrição',
        },
      ],
    },
    {
      name: 'jornada',
      type: 'array',
      label: 'Etapas da Jornada',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título da Etapa',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Descrição',
        },
      ],
    },
    {
      name: 'incluido',
      type: 'array',
      label: 'O que está incluído na consultoria',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'publico',
      type: 'array',
      label: 'Para quem é a consultoria',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contatos',
      type: 'group',
      label: 'Canais de Contato',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://www.instagram.com/manacaviagens/',
          label: 'Link do Instagram',
        },
        {
          name: 'instagramLabel',
          type: 'text',
          defaultValue: '@manacaviagens',
          label: 'Texto do Instagram',
        },
        {
          name: 'whatsapp',
          type: 'text',
          defaultValue: 'https://wa.me/5571986233609',
          label: 'Link do WhatsApp',
        },
        {
          name: 'whatsappLabel',
          type: 'text',
          defaultValue: '(71) 98623-3609',
          label: 'Texto do WhatsApp',
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'mailto:manacaviagens1@hotmail.com',
          label: 'Link de E-mail',
        },
        {
          name: 'emailLabel',
          type: 'text',
          defaultValue: 'manacaviagens1@hotmail.com',
          label: 'Texto do E-mail',
        },
      ],
    },
  ],
}
