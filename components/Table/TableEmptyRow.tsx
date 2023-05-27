import React from 'react'

export const TableEmptyRow = () => (
  <div className={'w-full py-4'}>
    <div className={'flex items-center gap-4'}>
      <span className={'text-sm text-metal'}>
        {'No products found. Please, try another search or add product ones in the section "+ Create Product"'}
      </span>
    </div>
  </div>
)
