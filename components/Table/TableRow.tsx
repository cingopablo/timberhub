import { TrashIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import useSWRMutation from 'swr/mutation'

import { Product } from '@/app/schema'
import { Button, Chip } from '@/components'
import sawn from '@/public/icons/sawn.svg'

async function remove(url: string, { arg }: { arg: number }) {
  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(arg),
  })
}

export const TableRow = (props: Product) => {
  const { id, created, species, grade, drying_method, dimensions } = props
  const { trigger } = useSWRMutation('/api', remove)

  return (
    <Link href={`/product?id=${id}`}>
      <div
        className={
          'grid w-full cursor-pointer grid-cols-2 items-center justify-between p-4 transition duration-150 hover:bg-gray/5 tablet:grid-cols-3 desktop:grid-cols-4'
        }>
        <div className={'flex items-center gap-4'}>
          <Image src={sawn} alt={'Sawn Timber'} className={'h-8 w-8'} />
          <div className={'flex flex-col'}>
            <span className={'text-sm'}>{`${species}, ${grade}, ${drying_method}`}</span>

            <div className={'flex gap-1'}>
              <span className={'text-2xs text-primary'}>{`#${id}`}</span>
              <span className={'text-2xs text-metal'}>
                {new Date(created!).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        <div className={'hidden tablet:flex tablet:gap-3'}>
          {dimensions.slice(0, 3).map(({ thickness, width }, index) => (
            <Chip key={index} count={index + 1} label={`${thickness}x${width}`} />
          ))}
          {dimensions.length > 3 && <Chip label={'+ 5 more sets'} />}
        </div>

        <div className={'ml-auto tablet:mx-0 tablet:items-start'}>
          <Button
            danger
            onClick={async e => {
              e.preventDefault()
              if (id) {
                await trigger(id)
              }
            }}>
            <TrashIcon className={'h-6 w-6'} />
          </Button>
        </div>
      </div>
    </Link>
  )
}
