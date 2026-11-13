import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/global.css'
import { getInstitucionalData } from '@/lib/institucional'
import HeaderNav from '@/components/HeaderNav'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Manacá Viagens',
    default: 'Manacá Viagens — Consultoria de Viagens Personalizadas',
  },
  description:
    'Consultoria de viagens personalizadas, com curadoria cuidadosa de destinos e ritmo sob medida.',
  robots: {
    index: false,
    follow: false,
  },
}

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/quem-somos', label: 'A Manacá' },
  { href: '/servicos', label: 'Consultoria' },
  { href: '/destinos', label: 'Destinos' },
  { href: '/blog', label: 'Diário' },
]

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const institucional = await getInstitucionalData()
  const contatos = institucional.contatos

  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <header className="site-header">
          <div className="header-inner wrap">
            <Link className="brand" href="/" aria-label="Manacá Viagens, início">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="brand-logo-img"
                src="/media/logo-original.png"
                alt="Manacá Viagens"
                width={1983}
                height={793}
              />
            </Link>
            <HeaderNav />
          </div>
        </header>
        <main id="conteudo">{children}</main>
        <footer className="footer">
          <div className="wrap footer-grid">
            <div>
              <Link className="footer-brand" href="/" aria-label="Manacá Viagens, início">
                <span className="footer-brand-text">
                  Manacá <em>Viagens</em>
                </span>
              </Link>
              <p>
                Viagens pensadas com cuidado,
                <br />
                para serem vividas no seu ritmo.
              </p>
            </div>
            <div>
              <span className="eyebrow">Explore</span>
              <nav aria-label="Navegação do rodapé">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
                <Link href="/contato">Contato</Link>
              </nav>
            </div>
            <div>
              <span className="eyebrow">Contato</span>
              <nav aria-label="Canais de contato">
                {contatos.instagram && (
                  <a
                    href={contatos.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram: {contatos.instagramLabel}
                  </a>
                )}
                {contatos.whatsapp && (
                  <a
                    href={contatos.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: {contatos.whatsappLabel}
                  </a>
                )}
                {contatos.email && (
                  <a href={contatos.email}>
                    E-mail: {contatos.emailLabel}
                  </a>
                )}
              </nav>
            </div>
          </div>
          <div className="wrap footer-bottom">
            <span>Manacá Viagens</span>
            <span>Feito para descobrir, com calma.</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
