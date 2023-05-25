'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { undefined, z } from 'zod'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'

// Some random options for the selects (probably I butchered some of them)
const usageOptions = ['Flooring', 'Decking', 'Timber screens', 'Cladding'] as const
const speciesOptions = ['Alder', 'Cedar', 'Mahogany', 'Oak'] as const
const dryingOptions = ['Air dried', 'Kiln dried'] as const
const gradeOptions = ['A', 'A1', 'A2', 'A3', 'A4', 'B', 'AB', 'C', 'D'] as const
const treatmentOptions = ['Oil', 'Stain and dye', 'Preserver', 'Varnish', 'Paint'] as const

const productSchema = z.object({
  usage: z.enum(usageOptions).optional(),
  species: z.enum(speciesOptions).optional(),
  dryingMethod: z.enum(dryingOptions).optional(),
  grade: z.enum(gradeOptions).optional(),
  treatment: z.enum(treatmentOptions).optional(),
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
    control,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm<ProductType>({
    mode: 'onChange',
    resolver: zodResolver(productSchema), // Configuration the validation with the zod schema.
    defaultValues: {
      usage: undefined,
      species: undefined,
      dryingMethod: undefined,
      grade: undefined,
      treatment: undefined,
      dimensions: [{ thickness: undefined, width: undefined, length: undefined }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'dimensions',
    control,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-2 flex-col'}>
      <p className={'text-2xl'}>Sawn Timber</p>
      <div className={'grid grid-cols-1 gap-8 p-4 tablet:grid-cols-2'}>
        <Controller
          name={'usage'}
          control={control}
          render={({ field }) => <Select options={usageOptions} {...field} />}
        />
        <Controller
          name={'species'}
          control={control}
          render={({ field }) => <Select options={speciesOptions} {...field} />}
        />
      </div>
      <p className={'text-2xl'}>Specifications</p>
      <div className={'grid grid-cols-1 gap-8 p-4 tablet:grid-cols-3'}>
        <Controller
          name={'dryingMethod'}
          control={control}
          render={({ field }) => <Select options={dryingOptions} {...field} />}
        />
        <Controller
          name={'grade'}
          control={control}
          render={({ field }) => <Select options={gradeOptions} {...field} />}
        />
        <Controller
          name={'treatment'}
          control={control}
          render={({ field }) => <Select options={treatmentOptions} {...field} />}
        />
      </div>
      <div className={'flex justify-between items-center'}>
        <p className={'text-2xl'}>Dimensions</p>
        <Button
          variant={'ghost'}
          onClick={() => append({ thickness: undefined, length: undefined, width: undefined })}
          className={'text-primary-dark hover:text-primary active:text-primary-dark'}>
          + Add another set
        </Button>
      </div>

      {fields.map((field, index) => {
        const isRemovable = index > 0
        return (
          <div key={field.id} className={'flex flex-1 items-center px-4 gap-8'}>
            <div className={'grid grid-cols-1 gap-8 tablet:grid-cols-3 w-full'}>
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
            {isRemovable ? (
              <TrashIcon
                className={'transition ease-in duration-100 w-6 h-6 cursor-pointer hover:text-danger'}
                onClick={() => remove(index)}
              />
            ) : (
              <div className={'w-6 h-6'} />
            )}
          </div>
        )
      })}
      <Button type={'submit'}>Create Product</Button>
    </form>
  )
}
