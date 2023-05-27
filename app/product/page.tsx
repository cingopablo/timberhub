'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrashIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { options, Product, productSchema } from '@/app/schema'
import { Button, Input, Select } from '@/components'
import dimensions from '@/public/icons/dimensions.svg'
import sawn from '@/public/icons/sawn.svg'
import specs from '@/public/icons/specs.svg'
import { fetcher } from '@/utils'

// I followed the id structure from the example
const randomId = () => {
  return Math.floor(Math.random() * 10099999) + 10013432
}
async function create(url: string, { arg }: { arg: Product }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })
}

export default function ProductPage() {
  const { trigger } = useSWRMutation('/api', create)
  const [showCompleted, setShowCompleted] = React.useState(false)
  const { usage, species, drying, grade, treatment } = options
  const search = useSearchParams()

  const { data } = useSWR(`/api?id=${search.get('id')}`, fetcher)

  const loadedProduct = data?.[0]
  const readOnly = Boolean(loadedProduct)

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isSubmitting, defaultValues, errors, isValid },
  } = useForm<Product>({
    mode: 'onSubmit',
    resolver: zodResolver(productSchema),
    defaultValues: {
      dimensions: [{}],
    },
  })

  console.log(errors)

  const { fields, append, remove } = useFieldArray({
    name: 'dimensions',
    control,
  })

  const onSubmit = async (product: Product) => {
    reset(defaultValues)
    await trigger({ ...product, id: randomId(), created: new Date().getTime() })
    setShowCompleted(true)
  }

  React.useEffect(() => {
    const timer = setTimeout(() => setShowCompleted(false), 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [showCompleted])

  React.useEffect(() => {
    if (loadedProduct) {
      reset(loadedProduct)
    }
  }, [loadedProduct])

  return (
    <div className={'flex flex-1 flex-col px-6 pb-6 pt-4'}>
      <div className={'flex items-center justify-between border-b border-border pb-2'}>
        <span className={'text-2xl'}>{readOnly ? 'Product Overview' : 'Create Product'}</span>
        {showCompleted && <span className={'bg-primary px-4 py-2'}>New Product Created!</span>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-1 flex-col'}>
        <div className={'flex flex-col gap-10 divide-y divide-border last:divide-primary'}>
          <div className={'flex flex-col items-start gap-5 pt-10'}>
            <div className={'flex w-full gap-4'}>
              <Image src={sawn} alt={'Sawn Timber'} className={'mt-3 h-8 w-8'} />
              <span className={'text-2xl'}>Sawn Timber</span>
            </div>
            <div className={'grid w-full grid-cols-1 gap-8 tablet:grid-cols-2 tablet:pl-12'}>
              <Controller
                name={'usage'}
                control={control}
                render={({ field }) => (
                  <Select
                    label={'Usage *'}
                    helper={'This will help us find what fits best to your needs.'}
                    options={usage}
                    disabled={readOnly}
                    {...field}
                  />
                )}
              />
              <Controller
                name={'species'}
                control={control}
                render={({ field }) => (
                  <Select label={'Wood species *'} options={species} disabled={readOnly} {...field} />
                )}
              />
            </div>
          </div>
          <div className={'flex flex-col items-start gap-5 pt-10'}>
            <div className={'flex w-full gap-4'}>
              <Image src={specs} alt={'Specifications'} className={'mt-3 h-8 w-8'} />
              <span className={'text-2xl'}>Specifications</span>
            </div>
            <div className={'grid w-full grid-cols-1 gap-8 tablet:grid-cols-3 tablet:pl-12'}>
              <Controller
                name={'drying_method'}
                control={control}
                render={({ field }) => <Select label={'Drying *'} options={drying} disabled={readOnly} {...field} />}
              />
              <Controller
                name={'grade'}
                control={control}
                render={({ field }) => <Select label={'Grade *'} options={grade} disabled={readOnly} {...field} />}
              />
              <Controller
                name={'treatment'}
                control={control}
                render={({ field }) => (
                  <Select label={'Treatment *'} options={treatment} disabled={readOnly} {...field} />
                )}
              />
            </div>
          </div>
          <div className={'flex flex-col items-start gap-5 pt-10'}>
            <div className={'flex w-full gap-4'}>
              <Image src={dimensions} alt={'Specifications'} className={'mt-3 h-8 w-8'} />
              <div className={'flex w-full items-center justify-between'}>
                <span className={'text-2xl'}>Dimensions</span>
                {!readOnly && (
                  <Button
                    variant={'ghost'}
                    onClick={() => append({})}
                    disabled={Object.values(getValues('dimensions').slice(-1)[0]).includes(NaN)}
                    className={'text-primary-dark hover:text-primary active:text-primary-dark'}>
                    + Add another set
                  </Button>
                )}
              </div>
            </div>
            <div className={'grid w-full gap-8 tablet:pl-12'}>
              {fields.map((field, index) => {
                const isRemovable = index > 0 && !readOnly
                return (
                  <div key={field.id} className={'relative flex w-full flex-1 items-end gap-4'}>
                    {isRemovable && (
                      <Button danger onClick={() => remove(index)} className={'absolute -left-14 px-1'}>
                        <TrashIcon className={'h-6 w-6'} />
                      </Button>
                    )}
                    <div className={'grid w-full grid-cols-1 gap-8 tablet:grid-cols-3'}>
                      <Input
                        label={'Thickness *'}
                        type={'number'}
                        disabled={readOnly}
                        {...register(`dimensions.${index}.thickness`, { valueAsNumber: true })}
                        defaultValue={field.thickness}
                      />
                      <Input
                        label={'Width *'}
                        type={'number'}
                        disabled={readOnly}
                        {...register(`dimensions.${index}.width`, { valueAsNumber: true })}
                        defaultValue={field.width}
                      />
                      <Input
                        label={'Length *'}
                        type={'number'}
                        disabled={readOnly}
                        {...register(`dimensions.${index}.length`, { valueAsNumber: true })}
                        defaultValue={field.length}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className={'mt-10 flex justify-between tablet:mt-auto'}>
          <Link href={'/'}>
            <Button variant={'ghost'}>Close</Button>
          </Link>
          {!readOnly && (
            <Button type={'submit'} disabled={!isValid || isSubmitting}>
              Create Product
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
