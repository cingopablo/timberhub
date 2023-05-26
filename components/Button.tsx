import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  danger?: boolean
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', disabled = false, danger = false, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        ${styles.base}
        ${!danger ? styles.variant[variant] : styles.danger}
        ${disabled && styles.disabled}
        ${className}
      `}
      {...props}>
      {children}
    </button>
  )
)

const styles = {
  base: 'transition ease-in-out duration-150 text-m font-bold text-black uppercase px-4 py-2 h-10 outline-none',
  disabled: 'opacity-50 cursor-not-allowed text-metal',
  variant: {
    primary: `
      bg-primary
      enabled:hover:bg-primary-light
      enabled:hover:text-metal
      enabled:focus:bg-primary-light
      enabled:focus:text-metal
      enabled:active:bg-primary
      enabled:active:text-black
    `,
    secondary: `
      ring-2
      ring-inset
      ring-primary
      enabled:hover:ring-primary-light
      enabled:hover:text-metal
      enabled:focus:ring-primary-light
      enabled:focus:text-metal
      enabled:active:ring-primary
      enabled:active:text-black
      disabled:ring-primary
      disabled:text-metal
    `,
    ghost: `
      enabled:hover:text-primary-light
      enabled:focus:text-primary-light
      enabled:active:text-black
      disabled:text-gray
    `,
  },
  danger: 'text-danger enabled:hover:text-danger/60 enabled:active:text-danger enabled:active:text-danger/60',
}
