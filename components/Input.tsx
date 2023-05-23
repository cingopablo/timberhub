import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string | number | undefined
  className?: string
  addonStart?: React.ReactElement
  addonEnd?: React.ReactElement
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { value, addonStart, addonEnd, disabled, className, ...other },
  ref
) {
  return (
    <div className={`${styles.root} ${className}`}>
      {addonStart ? <div className={`${styles.addon} rounded-l-md mr-4`}>{addonStart}</div> : null}
      <input ref={ref} value={value} disabled={disabled} className={styles.input} {...other} />
      {addonEnd ? <div className={`${styles.addon} rounded-r-md ml-4`}>end</div> : null}
    </div>
  )
})

const styles = {
  root: `
    flex
    transition
    ease-in-out
    duration-150
    h-10
    px-4
    py-2
    ring-1
    ring-inset
    ring-border
    rounded-md
    hover:ring-gray/60
    text-m
    focus:ring-primary
    focus-within:ring-primary
  `,
  input: `
    flex-1
    w-full
    caret-primary-dark
    outline-none
    placeholder:font-normal
  `,
  addon: 'flex items-center text-metal/80',
}
