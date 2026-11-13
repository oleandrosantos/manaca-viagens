import React from 'react'

interface FlorManacaProps {
  className?: string
  size?: number | string
  color?: string
}

export const FlorManaca: React.FC<FlorManacaProps> = ({
  className = '',
  size = '100%',
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill={color}
      aria-hidden="true"
    >
      <defs>
        <path
          id="manaca-petal"
          d="M 50 43 C 43 38 30 26 34 15 C 37 8 44 7 50 11 C 56 7 63 8 66 15 C 70 26 57 38 50 43 Z"
        />
        <g id="manaca-stamen">
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="40"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="50" cy="39" r="1.5" opacity="0.85" />
        </g>
      </defs>

      {/* 5 Pétalas características da flor do Manacá */}
      <use href="#manaca-petal" />
      <use href="#manaca-petal" transform="rotate(72 50 50)" />
      <use href="#manaca-petal" transform="rotate(144 50 50)" />
      <use href="#manaca-petal" transform="rotate(216 50 50)" />
      <use href="#manaca-petal" transform="rotate(288 50 50)" />

      {/* Miolo e estames delicados */}
      <use href="#manaca-stamen" transform="rotate(36 50 50)" />
      <use href="#manaca-stamen" transform="rotate(108 50 50)" />
      <use href="#manaca-stamen" transform="rotate(180 50 50)" />
      <use href="#manaca-stamen" transform="rotate(252 50 50)" />
      <use href="#manaca-stamen" transform="rotate(324 50 50)" />
      <circle cx="50" cy="50" r="4.5" opacity="0.75" />
    </svg>
  )
}

export default FlorManaca
