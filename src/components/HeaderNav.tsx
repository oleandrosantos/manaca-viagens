'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  href: string
  label: string
}

const links: NavLink[] = [
  { href: '/', label: 'Início' },
  { href: '/quem-somos', label: 'A Manacá' },
  { href: '/servicos', label: 'Consultoria' },
  { href: '/destinos', label: 'Destinos' },
  { href: '/blog', label: 'Diário' },
]

export const HeaderNav: React.FC = () => {
  const pathname = usePathname()
  const detailsRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        detailsRef.current.open = false
        detailsRef.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false
    }
  }

  return (
    <>
      <nav aria-label="Navegação principal" className="desktop-nav">
        {links.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
      <Link className="header-cta" href="/contato">
        Vamos conversar <span aria-hidden="true">↗</span>
      </Link>
      <details ref={detailsRef} className="mobile-menu">
        <summary>
          Menu <span aria-hidden="true">☰</span>
        </summary>
        <nav aria-label="Navegação móvel">
          {links.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/contato" onClick={closeMenu}>
            Contato ↗
          </Link>
        </nav>
      </details>
    </>
  )
}

export default HeaderNav
