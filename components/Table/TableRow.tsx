import Image from 'next/image'
import React from 'react'

import { Chip } from '@/components/Chip'
import { TableProduct } from '@/components/Table/Table'
import sawn from '@/public/icons/sawn.svg'

export const TableRow = (props: TableProduct) => {
  const { id, created, species, grade, drying_method, dimensions } = props
  return (
    <div
      className={
        'flex w-full cursor-pointer items-center justify-between p-4 transition duration-150 hover:bg-gray/5 tablet:grid tablet:grid-cols-2 desktop:grid-cols-4'
      }>
      <div className={'flex items-center gap-4'}>
        <Image src={sawn} alt={'Sawn Timber'} className={'h-8 w-8'} />
        <div className={'flex flex-col'}>
          <span className={'text-sm'}>{`${species}, ${grade}, ${drying_method}`}</span>

          <div className={'flex gap-1'}>
            <span className={'text-2xs text-primary'}>{`#${id}`}</span>
            <span className={'text-2xs text-metal'}>{created}</span>
          </div>
        </div>
      </div>

      <div className={'flex gap-3'}>
        {dimensions.map(({ thickness, width }, index) => (
          <Chip key={index} count={index + 1} label={`${thickness}x${width}`} />
        ))}
      </div>
    </div>
  )
}
