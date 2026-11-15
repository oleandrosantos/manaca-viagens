'use client'

import React, { useEffect, useId, useRef, useState } from 'react'

interface WhatsAppWidgetProps {
  whatsappUrl: string
  whatsappLabel?: string
}

function buildWhatsAppHref(baseUrl: string, message: string): string {
  const trimmed = message.trim()
  if (!trimmed) return baseUrl
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}text=${encodeURIComponent(trimmed)}`
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  whatsappUrl,
  whatsappLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState(
    'Olá! Gostaria de conversar sobre uma consultoria de viagem personalizada.',
  )
  const popupId = useId()
  const titleId = useId()
  const messageInputId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  if (!whatsappUrl) {
    return null
  }

  const targetHref = buildWhatsAppHref(whatsappUrl, message)

  return (
    <div className="wa-widget">
      {isOpen && (
        <div
          id={popupId}
          className="wa-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
        >
          <div className="wa-popup-header">
            <div className="wa-popup-title-group">
              <span className="wa-popup-eyebrow">ATENDIMENTO DIRETO</span>
              <h2 id={titleId} className="wa-popup-title">
                Manacá Viagens
              </h2>
              {whatsappLabel && (
                <p className="wa-popup-subtitle">{whatsappLabel}</p>
              )}
            </div>
            <button
              type="button"
              className="wa-popup-close"
              onClick={() => {
                setIsOpen(false)
                triggerRef.current?.focus()
              }}
              aria-label="Fechar janela do WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="wa-popup-body">
            <p className="wa-popup-greeting">
              Olá! Conte um pouco sobre a viagem que você gostaria de planejar
              no seu ritmo.
            </p>
            <label htmlFor={messageInputId} className="wa-popup-label">
              Sua mensagem
            </label>
            <textarea
              id={messageInputId}
              ref={inputRef}
              className="wa-popup-textarea"
              rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Escreva sua mensagem..."
            />
            <a
              className="wa-popup-send"
              href={targetHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <span>Iniciar conversa no WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        className="wa-trigger"
        aria-expanded={isOpen}
        aria-controls={popupId}
        aria-label={
          isOpen ? 'Fechar atendimento no WhatsApp' : 'Conversar pelo WhatsApp'
        }
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          className="wa-trigger-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.79 14.12c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.01-2.42c.27-.29.58-.36.77-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.59.17.29.75 1.24 1.61 2 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
        </svg>
        <span className="wa-trigger-text">WhatsApp</span>
      </button>
    </div>
  )
}

export default WhatsAppWidget
