import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', disabled = false, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        ${styles.base}
        ${styles.variant[variant]}
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
      hover:bg-primary-light
      hover:text-metal
      focus:bg-primary-light
      focus:text-metal
      active:bg-primary
      active:text-black
      disabled:bg-primary
    `,
    secondary: `
      ring-2
      ring-inset
      ring-primary
      hover:ring-primary-light
      hover:text-metal
      focus:ring-primary-light
      focus:text-metal
      active:ring-primary
      active:text-black
      disabled:ring-primary
      disabled:text-metal
    `,
    ghost: `
      hover:text-gray
      focus:text-gray
      active:text-black
      disabled:text-gray
    `,
  },
}
