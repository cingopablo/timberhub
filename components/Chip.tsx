import React from 'react'

interface ChipProps {
  label: string
  count?: number
  className?: string
}

export const Chip = ({ label, count, className }: ChipProps) => (
  <span
    className={`flex w-fit gap-2 whitespace-nowrap rounded-md bg-chip-background px-2 py-1 text-xs text-chip-color ${className}`}>
    {count && <div className={'text-metal'}>{count}</div>}
    {label}
  </span>
)
