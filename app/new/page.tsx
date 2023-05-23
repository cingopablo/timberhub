'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'] as const
const options2 = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

const productSchema = z.object({
  usage: z.enum(options).optional(),
  species: z.enum(options).optional(),
  dryingMethod: z.enum(options),
  grade: z.enum(options),
  treatment: z.enum(options),
  dimensions: z.array(
    z.object({
      thickness: z.number().optional(),
      width: z.number().optional(),
      length: z.number().optional(),
    })
  ),
})

type ProductType = z.infer<typeof productSchema>

const onSubmit = (product: ProductType) => {
  console.log('onSubmit', product)
}
export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<ProductType>({
    mode: 'onChange',
    resolver: zodResolver(productSchema), // Configuration the validation with the zod schema.
    defaultValues: {
      usage: 'Apple',
      species: 'Banana',
      dryingMethod: undefined,
      grade: undefined,
      treatment: undefined,
      dimensions: [{}],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'dimensions',
    control,
  })

  console.log(getValues())

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-2 flex-col'}>
      <p className={'text-2xl'}>Sawn Timber</p>
      <div className={'grid grid-cols-1 gap-8 p-4 tablet:grid-cols-2'}>
        <Select options={options2} {...register('usage', { value: watch('usage') })} />
        <Select options={options2} {...register('species', { value: watch('species') })} />
      </div>
      <p className={'text-2xl'}>Specifications</p>
      <div className={'grid grid-cols-1 gap-8 p-4 tablet:grid-cols-3'}>
        <Select options={options2} {...register('dryingMethod', { value: watch('usage') })} />
        <Select options={options2} {...register('grade', { value: watch('species') })} />
        <Select options={options2} {...register('treatment', { value: watch('species') })} />
      </div>
      <div className={'flex justify-between items-center'}>
        <p className={'text-2xl'}>Dimensions</p>
        <Button
          variant={'ghost'}
          onClick={() => append({})}
          className={'text-primary-dark hover:text-primary active:text-primary-dark'}>
          + Add another set
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className={'grid grid-cols-1 gap-8 p-4 tablet:grid-cols-3'}>
          <Input
            type={'number'}
            {...register(`dimensions.${index}.thickness`, { valueAsNumber: true })}
            defaultValue={field.thickness}
          />
          <Input
            type={'number'}
            {...register(`dimensions.${index}.width`, { valueAsNumber: true })}
            defaultValue={field.width}
          />
          <Input
            type={'number'}
            {...register(`dimensions.${index}.length`, { valueAsNumber: true })}
            defaultValue={field.length}
          />
        </div>
      ))}
      <Button type={'submit'}>Create Product</Button>
    </form>
  )
}
