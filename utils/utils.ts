import { Fetcher } from 'swr'

import { TableProduct } from '@/components/Table/Table'

export const fetcher: Fetcher<TableProduct[], string> = (...args) => fetch(...args).then(res => res.json())
