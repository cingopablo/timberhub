'use client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

import { Button, Input, Table, TableLoading } from '@/components'
import { fetcher } from '@/utils'

export default function Home() {
  const { data, isLoading } = useSWR('/api', fetcher)
  const router = useRouter()
  const search = useSearchParams()

  const [searchText, setSearchText] = React.useState('')

  const id = search.get('id')

  const filteredProducts = data?.filter(
    product =>
      product.species?.toLowerCase().includes(searchText.trim()) ||
      product.grade?.toLowerCase().includes(searchText.trim()) ||
      product.drying_method?.toLowerCase().includes(searchText.trim())
  )

  console.log(id)
  return (
    <main className={'flex  flex-col px-6'}>
      <div className={'flex items-center justify-between pb-8 pt-6'}>
        <span className={'text-2xl'}>All Products</span>
        <Button variant={'secondary'} onClick={() => router.push('/product')}>
          + Create Product
        </Button>
      </div>
      <Input
        placeholder={'Search'}
        addonStart={<MagnifyingGlassIcon className={'h-4 w-4'} />}
        className={'pb-8'}
        classNameInput={'shadow-default'}
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
      />
      {filteredProducts && !isLoading ? <Table products={filteredProducts} /> : <TableLoading />}
      {Boolean(id) && <div className={'bg-primary p-10'}>hola</div>}
    </main>
  )
}
