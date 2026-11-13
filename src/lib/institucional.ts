import { getPayloadClient } from './payload'
import fallback from '@/data/institucional.json'

export interface InstitucionalData {
  heroEyebrow: string
  heroTitle: string
  heroDescription: string
  introTitle: string
  introText: string
  founderText: string
  destinosTexto: string
  diarioTexto: string
  nomeTexto: string[]
  historiaTexto: string[]
  adjaneTexto: string[]
  beneficios: { title: string; text: string }[]
  jornada: { title: string; text: string }[]
  incluido: string[]
  publico: string[]
  contatos: {
    instagram: string
    instagramLabel: string
    whatsapp: string
    whatsappLabel: string
    email: string
    emailLabel: string
  }
}

export async function getInstitucionalData(): Promise<InstitucionalData> {
  const defaultContatos = {
    instagram: 'https://www.instagram.com/manacaviagens/',
    instagramLabel: '@manacaviagens',
    whatsapp: 'https://wa.me/5571986233609',
    whatsappLabel: '(71) 98623-3609',
    email: 'mailto:manacaviagens1@hotmail.com',
    emailLabel: 'manacaviagens1@hotmail.com',
  }

  try {
    const payload = await getPayloadClient()
    const inst = await payload.findGlobal({ slug: 'institucional' })

    if (!inst) {
      return {
        ...fallback,
        contatos: defaultContatos,
      }
    }

    return {
      heroEyebrow: inst.heroEyebrow || fallback.heroEyebrow,
      heroTitle: inst.heroTitle || fallback.heroTitle,
      heroDescription: inst.heroDescription || fallback.heroDescription,
      introTitle: inst.introTitle || fallback.introTitle,
      introText: inst.introText || fallback.introText,
      founderText: inst.founderText || fallback.founderText,
      destinosTexto: inst.destinosTexto || fallback.destinosTexto,
      diarioTexto: inst.diarioTexto || fallback.diarioTexto,
      nomeTexto:
        inst.nomeTexto && inst.nomeTexto.length > 0
          ? inst.nomeTexto.map((n) => n.paragrafo)
          : fallback.nomeTexto,
      historiaTexto:
        inst.historiaTexto && inst.historiaTexto.length > 0
          ? inst.historiaTexto.map((h) => h.paragrafo)
          : fallback.historiaTexto,
      adjaneTexto:
        inst.adjaneTexto && inst.adjaneTexto.length > 0
          ? inst.adjaneTexto.map((a) => a.paragrafo)
          : fallback.adjaneTexto,
      beneficios:
        inst.beneficios && inst.beneficios.length > 0
          ? inst.beneficios
          : fallback.beneficios,
      jornada:
        inst.jornada && inst.jornada.length > 0
          ? inst.jornada
          : fallback.jornada,
      incluido:
        inst.incluido && inst.incluido.length > 0
          ? inst.incluido.map((i) => i.item)
          : fallback.incluido,
      publico:
        inst.publico && inst.publico.length > 0
          ? inst.publico.map((p) => p.item)
          : fallback.publico,
      contatos: {
        instagram: inst.contatos?.instagram || defaultContatos.instagram,
        instagramLabel:
          inst.contatos?.instagramLabel || defaultContatos.instagramLabel,
        whatsapp: inst.contatos?.whatsapp || defaultContatos.whatsapp,
        whatsappLabel:
          inst.contatos?.whatsappLabel || defaultContatos.whatsappLabel,
        email: inst.contatos?.email || defaultContatos.email,
        emailLabel: inst.contatos?.emailLabel || defaultContatos.emailLabel,
      },
    }
  } catch (err) {
    console.warn('Erro ao carregar dados institucionais:', err)
    return {
      ...fallback,
      contatos: defaultContatos,
    }
  }
}
