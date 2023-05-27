import { Fetcher } from 'swr'

import { Product } from '@/app/schema'

export const fetcher: Fetcher<Product[], string> = (...args) => fetch(...args).then(res => res.json())
