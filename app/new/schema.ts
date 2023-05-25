import { z } from 'zod'

// Some random options for the selects (probably I butchered some of them)

export const options = {
  usage: ['Flooring', 'Decking', 'Timber screens', 'Cladding'] as const,
  species: ['Alder', 'Cedar', 'Mahogany', 'Oak'] as const,
  drying: ['Air dried', 'Kiln dried'] as const,
  grade: ['A', 'A1', 'A2', 'A3', 'A4', 'B', 'AB', 'C', 'D'] as const,
  treatment: ['Oil', 'Stain and dye', 'Preserver', 'Varnish', 'Paint'] as const,
}

export const productSchema = z.object({
  usage: z.enum(options.usage).optional(),
  species: z.enum(options.species).optional(),
  drying_method: z.enum(options.drying).optional(),
  grade: z.enum(options.grade).optional(),
  treatment: z.enum(options.treatment).optional(),
  dimensions: z.array(
    z.object({
      thickness: z.number().optional(),
      width: z.number().optional(),
      length: z.number().optional(),
    })
  ),
})

export type Product = z.infer<typeof productSchema>
