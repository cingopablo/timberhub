'use client'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import React from 'react'

interface SelectProps {
  label?: string
  helper?: string
  value?: string
  options: readonly string[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helper, value, options, ...props },
  ref
) {
  return (
    <div className={'flex flex-col gap-1'}>
      {label && (
        <label htmlFor={label} className={'text-lg'}>
          {label}
        </label>
      )}
      <Listbox value={value} {...props} ref={ref}>
        <div className={'relative mt-1 text-m'}>
          <Listbox.Button
            id={label}
            className={
              'relative w-full cursor-pointer rounded-md px-4 py-2 text-left ring-1 ring-inset ring-border hover:ring-gray/60 focus:outline-none focus:ring-primary focus-visible:ring-primary active:ring-gray/80'
            }>
            <span className={`block truncate ${value ? 'text font-bold' : 'font-normal text-gray'}`}>
              {value ?? 'Select'}
            </span>
            <span className={'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'}>
              <ChevronDownIcon className={'h-5 w-5 text-primary'} aria-hidden={'true'} />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave={'transition ease-in duration-100'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}>
            <Listbox.Options
              className={
                'text-base sm:text-sm absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-default ring-1 ring-inset ring-border/50 focus:outline-none'
              }>
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative h-10 cursor-pointer select-none px-4 py-2 pr-4 ${
                      active ? 'bg-gray/10 text-black' : 'text-gray'
                    }`
                  }
                  value={option}>
                  {({ selected }) => (
                    <React.Fragment>
                      <span className={`block truncate ${selected ? 'text-black' : 'text-gray'}`}>{option}</span>
                      {selected ? (
                        <span className={'absolute inset-y-0 right-4 flex items-center pl-3 text-primary'}>
                          <CheckIcon className={'h-5 w-5'} aria-hidden={'true'} />
                        </span>
                      ) : null}
                    </React.Fragment>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {helper && <span className={'text-2xs font-bold leading-[18px] text-gray'}>{helper}</span>}
    </div>
  )
})
