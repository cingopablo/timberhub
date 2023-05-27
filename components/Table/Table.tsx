import React from 'react'

import { Product } from '@/app/schema'

import { TableEmptyRow } from './TableEmptyRow'
import { TableRow } from './TableRow'
interface TableProps {
  products: Product[]
}

export const Table = ({ products }: TableProps) => {
  return (
    <div>
      <div className={'grid w-full grid-cols-2 px-4 text-xs text-metal tablet:grid-cols-3 desktop:grid-cols-4'}>
        <span>Product (Species, Grade, Drying)</span>
        <span className={'hidden tablet:block'}>Dimensions (Thickness x Width)</span>
        <span className={'text-right tablet:text-left'}>Delete</span>
      </div>
      <div className={'flex max-h-[80vh] flex-col divide-y divide-border overflow-y-auto'}>
        {products.length > 0 ? products.map(product => <TableRow key={product.id} {...product} />) : <TableEmptyRow />}
      </div>
    </div>
  )
}
