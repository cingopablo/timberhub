import React from 'react'

import { Product } from '@/app/new/schema'
import { TableRow } from '@/components/Table/TableRow'
import { TableEmptyRow } from '@/components/Table/TableEmptyRow'

export type TableProduct = Product & {
  id: number
  created: number
}
interface TableProps {
  products: TableProduct[]
  className?: string
}

export const Table = ({ products, className }: TableProps) => {
  return (
    <div className={className}>
      <div className={'hidden w-full grid-cols-2 text-xs text-metal tablet:grid desktop:grid-cols-4'}>
        <span>Product (Species, Grade, Drying)</span>
        <span>Dimensions (Thickness x Width)</span>
      </div>
      <div className={'flex flex-col divide-y divide-border'}>
        {products.length > 0 ? products.map(product => <TableRow key={product.id} {...product} />) : <TableEmptyRow />}
      </div>
    </div>
  )
}
