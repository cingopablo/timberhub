'use client'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import React from 'react'

interface SelectProps {
  value?: string
  options: readonly string[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { value, options, ...props },
  ref
) {
  return (
    <Listbox value={value} {...props} ref={ref}>
      <div className={'relative mt-1 text-m'}>
        <Listbox.Button
          className={
            'relative w-full cursor-pointer rounded-md py-2 px-4 text-left ring-1 ring-inset ring-border hover:ring-gray/60 focus:ring-gray/80 focus-visible:ring-gray/80 active:ring-gray/80 focus:outline-none'
          }>
          <span className={`block truncate ${value ? 'font-bold text' : 'font-normal text-gray'}`}>
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
              'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-default ring-1 ring-inset ring-border/50 focus:outline-none sm:text-sm'
            }>
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none h-10 py-2 px-4 pr-4 ${
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
  )
})
