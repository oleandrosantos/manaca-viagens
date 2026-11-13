import React from 'react'
import type { Metadata } from 'next'
import { getInstitucionalData } from '@/lib/institucional'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Informações sobre contato com a Manacá Viagens.',
}

export default async function ContatoPage() {
  const institucional = await getInstitucionalData()
  const contatos = institucional.contatos

  return (
    <>
      <section className="page-hero blush">
        <div className="wrap">
          <p className="eyebrow">CONTATO / COMEÇAR A CONVERSA</p>
          <h1>
            Toda viagem começa
            <br />
            <em>com uma ideia.</em>
          </h1>
          <p>Conte para nós o que você sonha viver na sua próxima jornada.</p>
        </div>
      </section>

      <section className="section wrap editorial">
        <div>
          <span className="eyebrow">FALE COM A MANACÁ</span>
          <h2>
            Vamos começar
            <br />
            <em>essa conversa.</em>
          </h2>
        </div>
        <div>
          <p>Escolha o canal que preferir para conversar sobre sua viagem.</p>
          <nav className="contact-links" aria-label="Canais de contato">
            {contatos.whatsapp && (
              <a
                className="contact-card contact-card-primary"
                href={contatos.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                <span className="contact-card-body">
                  <small>Atendimento direto</small>
                  <strong>WhatsApp</strong>
                  <span>{contatos.whatsappLabel}</span>
                </span>
                <span className="contact-card-arrow" aria-hidden="true">↗</span>
              </a>
            )}
            {contatos.instagram && (
              <a
                className="contact-card"
                href={contatos.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </span>
                <span className="contact-card-body">
                  <small>Inspirações e bastidores</small>
                  <strong>Instagram</strong>
                  <span>{contatos.instagramLabel}</span>
                </span>
                <span className="contact-card-arrow" aria-hidden="true">↗</span>
              </a>
            )}
            {contatos.email && (
              <a className="contact-card" href={contatos.email}>
                <span className="contact-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="contact-card-body">
                  <small>Mensagens e solicitações</small>
                  <strong>E-mail</strong>
                  <span>{contatos.emailLabel}</span>
                </span>
                <span className="contact-card-arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </nav>
        </div>
      </section>
    </>
  )
}
