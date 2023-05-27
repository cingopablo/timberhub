'use client'
import { Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

import ProductPage from '@/app/product/[id]/page'
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

  return (
    <main className={'flex flex-col px-6'}>
      <div className={'flex items-center justify-between pb-8 pt-6'}>
        <span className={'text-2xl'}>All Products</span>
        <Button variant={'secondary'} onClick={() => router.push('/?id=new')}>
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

      <Transition appear show={Boolean(id)} as={React.Fragment}>
        <Dialog as={'div'} className={'relative z-10'} onClose={() => router.push('/')}>
          <Transition.Child
            as={React.Fragment}
            enter={'ease-out duration-150'}
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}>
            <div className={'fixed inset-0 bg-black bg-opacity-25'} onClick={() => router.push('/')} />
          </Transition.Child>
          <ProductPage />
        </Dialog>
      </Transition>
    </main>
  )
}
