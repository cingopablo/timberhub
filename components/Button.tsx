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
        h-10 px-4 py-2 text-m font-bold uppercase text-black outline-none transition duration-150 ease-in-out
        ${
          !danger
            ? styles.variant[variant]
            : 'text-danger enabled:hover:text-danger/60 enabled:active:text-danger enabled:active:text-danger/60'
        }
        ${disabled && 'cursor-not-allowed text-metal opacity-50'}
        ${className}
      `}
      {...props}>
      {children}
    </button>
  )
)

const styles = {
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
}
