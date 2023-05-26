'use client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Table } from '@/components/Table/Table'
import { TableLoading } from '@/components/Table/TableLoading'
import { fetcher } from '@/utils/utils'

export default function Home() {
  const { data: products, isLoading } = useSWR('/api', fetcher)
  const [search, setSearch] = React.useState('')

  const filteredProducts = products?.filter(
    product =>
      product.species?.toLowerCase().includes(search.trim()) ||
      product.grade?.toLowerCase().includes(search.trim()) ||
      product.drying_method?.toLowerCase().includes(search.trim())
  )

  return (
    <main className={'flex  flex-col px-6'}>
      <div className={'flex items-center justify-between pb-8 pt-6'}>
        <span className={'text-2xl'}>All Products</span>
        <Link href={'/new'}>
          <Button variant={'secondary'}>+ Create Product</Button>
        </Link>
      </div>
      <Input
        placeholder={'Search'}
        addonStart={<MagnifyingGlassIcon className={'h-4 w-4'} />}
        className={'pb-8'}
        classNameInput={'shadow-default'}
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      {filteredProducts && !isLoading ? <Table products={filteredProducts} /> : <TableLoading />}
    </main>
  )
}
