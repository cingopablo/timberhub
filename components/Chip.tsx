import React from 'react'

interface ChipProps {
  label: string
  count?: number
  className?: string
}

export const Chip = ({ label, count, className }: ChipProps) => {
  return (
    <span className={`${styles.base} ${className}`}>
      {count && <div className={styles.counter}>{count}</div>}
      {label}
    </span>
  )
}

const styles = {
  base: 'flex gap-2 text-xs px-2 py-1 bg-chip-background text-chip-color w-fit rounded-md',
  counter: 'text-metal',
}
