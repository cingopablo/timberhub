import { Dialog } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import { fetchData, saveData } from '@/api/data'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

export default async function Home() {
  // const [value, setValue] = React.useState<string | undefined>(undefined)
  // const products = await fetchData()

  return (
    <main className={'flex min-h-screen flex-col px-6'}>
      <div className={'flex justify-between items-center pt-6 pb-8'}>
        <p className={'text-2xl'}>All Products</p>
        <Link href={'/new'}>
          <Button variant={'secondary'}>+ Create Product</Button>
        </Link>
      </div>
      <Input
        placeholder={'Search'}
        addonStart={<MagnifyingGlassIcon className={'w-4 h-4'} />}
        className={'shadow-default'}
        // onChange={value => console.log(value.target.value)}
      />
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
// <div className={'grid grid-cols-1 gap-2 p-4 tablet:grid-cols-3'}>
//   <Select value={value} options={options} onChange={setValue} />
//   <Select value={value} options={options} onChange={setValue} />
//   <Select value={value} options={options} onChange={setValue} />
// </div>
// <div className={'grid grid-cols-1 gap-2 p-4 tablet:grid-cols-3'}>
// <div className={'relative'}>
//   <table className={'table-auto w-full text-sm text-left text-gray'}>
//     <thead className={'text-xs text-gray dark:text-gray'}>
//       <tr>
//         <th>Product (Species, Grade, Drying)</th>
//         <th>Dimensions (ThicknessxWidth)</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr className={'bg-white  dark:bg-gray-800 dark:border-gray-700'}>
//         <th scope={'row'} className={'px-6 py-4 font-medium text-gray whitespace-nowrap'}>
//           Apple MacBook Pro 17
//         </th>
//         <td className={'px-6 py-4'}>Silver</td>
//       </tr>
//     </tbody>
//   </table>
// </div>
// </div>
