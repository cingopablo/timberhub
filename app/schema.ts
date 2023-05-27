import { z } from 'zod'

export const options = {
  usage: ['Pallet/Packaging', 'Flooring', 'Decking', 'Timber screens', 'Cladding'] as const,
  species: ['Alder', 'Cedar', 'Mahogany', 'Oak', 'Spruce'] as const,
  drying: ['Air dried', 'Kiln dried'] as const,
  grade: ['Nordic Blue Book', 'A', 'A1', 'A2', 'A3', 'A4', 'B', 'AB', 'C', 'D'] as const,
  treatment: ['Oil', 'Stain and dye', 'Preserver', 'Varnish', 'Paint'] as const,
}

export const productSchema = z.object({
  id: z.number().optional(),
  created: z.number().optional(),
  usage: z.enum(options.usage),
  species: z.enum(options.species),
  drying_method: z.enum(options.drying),
  grade: z.enum(options.grade),
  treatment: z.enum(options.treatment),
  dimensions: z.array(
    z.object({
      thickness: z.number().optional(),
      width: z.number().optional(),
      length: z.number().optional(),
    })
  ),
})

export type Product = z.infer<typeof productSchema>
