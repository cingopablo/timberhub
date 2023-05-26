import React from 'react'

import { Product } from '@/app/new/schema'
import { TableEmptyRow } from '@/components/Table/TableEmptyRow'
import { TableRow } from '@/components/Table/TableRow'

export type TableProduct = Product & {
  id: number
  created: number
}
interface TableProps {
  products: TableProduct[]
}

export const Table = ({ products }: TableProps) => {
  return (
    <div>
      <div className={'hidden w-full text-xs text-metal tablet:grid tablet:grid-cols-2 desktop:grid-cols-4'}>
        <span>Product (Species, Grade, Drying)</span>
        <span>Dimensions (Thickness x Width)</span>
      </div>
      <div className={'flex flex-col divide-y divide-border'}>
        {products.length > 0 ? products.map(product => <TableRow key={product.id} {...product} />) : <TableEmptyRow />}
      </div>
    </div>
  )
}
