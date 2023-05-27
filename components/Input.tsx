import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  value?: string | number | undefined
  className?: string
  classNameInput?: string
  addonStart?: React.ReactElement
  addonEnd?: React.ReactElement
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, value, addonStart, addonEnd, disabled, className, classNameInput, ...other },
  ref
) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={label} className={'text-lg'}>
          {label}
        </label>
      )}
      <div className={`${styles.root} ${disabled && '!ring-opacity-0 hover:!ring-gray/0'} ${classNameInput}`}>
        {addonStart ? <div className={`${styles.addon} mr-4 rounded-l-md`}>{addonStart}</div> : null}
        <input id={label} ref={ref} value={value} disabled={disabled} className={styles.input} {...other} />
        {addonEnd ? <div className={`${styles.addon} ml-4 rounded-r-md`}>end</div> : null}
      </div>
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
    disabled:bg-white
  `,
  addon: 'flex items-center text-metal/80',
}
