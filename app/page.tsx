'use client'

import { Dialog } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import { fetchData, saveData } from '@/api/data'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Table, TableProduct } from '@/components/Table/Table'
import useSWR, { Fetcher } from 'swr'

const fetcher: Fetcher<TableProduct, string> = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  // const [value, setValue] = React.useState<string | undefined>(undefined)
  const { data, error, isLoading } = useSWR('/api', fetcher)
  const [search, setSearch] = React.useState('')

  console.log(data)
  // const products = await fetchData()
  const products: TableProduct = []

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
        className={'shadow-default'}
        value={search}
        onChange={event => setSearch(event.target.value)}
      />

      <Table products={products} className={'pt-8'} />

      {/*{products.map(product => (*/}
      {/*  <div key={product.id}>{JSON.stringify(product, null, 2)}</div>*/}
      {/*))}*/}
    </main>
  )
}

// <div className={'flex gap-2 max-w-2xl'}>
//   {items.slice(0, 3).map(el => (
//     <Chip key={el} label={'16x1050'} count={el} />
//   ))}
//   {items.length > 3 ? <Chip label={'+ 5 more sets'} /> : null}
// </div>

// <div className={'flex gap-2 max-w-2xl p-4'}>
//   <Input type={'number'} />
// </div>
