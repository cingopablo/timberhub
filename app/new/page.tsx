'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrashIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'

import { options, Product, productSchema } from '@/app/new/schema'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { TableProduct } from '@/components/Table/Table'
import dimensions from '@/public/icons/dimensions.svg'
import sawn from '@/public/icons/sawn.svg'
import specs from '@/public/icons/specs.svg'

async function sendRequest(url: string, { arg }: { arg: TableProduct }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })
}

export default function CreateProduct() {
  const { usage, species, drying, grade, treatment } = options
  const { trigger } = useSWRMutation('/api', sendRequest)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<Product>({
    mode: 'onChange',
    resolver: zodResolver(productSchema), // Configuration the validation with the zod schema.
    defaultValues: {
      dimensions: [{}],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'dimensions',
    control,
  })

  const onSubmit = async (product: Product) => {
    await trigger({
      id: Math.floor(Math.random() * 10099999) + 10013432,
      created: new Date().getTime(),
      ...product,
    })

    if (isSubmitSuccessful) {
      reset()
    }
  }

  return (
    <div className={'flex flex-col gap-2 divide-y divide-border px-4 pt-4'}>
      <span className={'text-2xl'}>Create Product</span>
      <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-10 divide-y divide-border'}>
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
                  {...field}
                />
              )}
            />
            <Controller
              name={'species'}
              control={control}
              render={({ field }) => <Select label={'Wood species *'} options={species} {...field} />}
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
              render={({ field }) => <Select label={'Drying *'} options={drying} {...field} />}
            />
            <Controller
              name={'grade'}
              control={control}
              render={({ field }) => <Select label={'Grade *'} options={grade} {...field} />}
            />
            <Controller
              name={'treatment'}
              control={control}
              render={({ field }) => <Select label={'Treatment *'} options={treatment} {...field} />}
            />
          </div>
        </div>

        <div className={'flex flex-col items-start gap-5 pt-10'}>
          <div className={'flex w-full gap-4'}>
            <Image src={dimensions} alt={'Specifications'} className={'mt-3 h-8 w-8'} />
            <div className={'flex w-full items-center justify-between'}>
              <span className={'text-2xl'}>Dimensions</span>
              <Button
                variant={'ghost'}
                onClick={() => append({})}
                className={'text-primary-dark hover:text-primary active:text-primary-dark'}>
                + Add another set
              </Button>
            </div>
          </div>
          <div className={'grid w-full gap-8 tablet:pl-12'}>
            {fields.map((field, index) => {
              const isRemovable = index > 0
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
                      {...register(`dimensions.${index}.thickness`, { valueAsNumber: true })}
                      defaultValue={field.thickness}
                    />
                    <Input
                      label={'Width *'}
                      type={'number'}
                      {...register(`dimensions.${index}.width`, { valueAsNumber: true })}
                      defaultValue={field.width}
                    />
                    <Input
                      label={'Length *'}
                      type={'number'}
                      {...register(`dimensions.${index}.length`, { valueAsNumber: true })}
                      defaultValue={field.length}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={'flex justify-between pt-40'}>
          <Link href={'/'}>
            <Button variant={'ghost'}>Close</Button>
          </Link>
          <Button type={'submit'} disabled={!isValid || isSubmitting}>
            Create Product
          </Button>
        </div>
      </form>
    </div>
  )
}
