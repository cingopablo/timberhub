import React from 'react'

export const TableLoading = () => {
  return (
    <div>
      <div className={'hidden w-full grid-cols-3 tablet:grid desktop:grid-cols-4'}>
        <span className={'h-2 w-40 animate-pulse bg-gray/20'} />
        <span className={'h-2 w-40 animate-pulse bg-gray/20'} />
        <span className={'h-2 w-40 animate-pulse bg-gray/20'} />
      </div>
      <div className={'flex flex-col divide-y divide-border'}>
        {[1, 2, 3, 4].map(el => (
          <div
            key={el}
            className={
              'flex w-full items-center justify-between p-4 tablet:grid tablet:grid-cols-3 desktop:grid-cols-4'
            }>
            <div className={'flex items-center gap-4'}>
              <span className={'h-8 w-8 animate-pulse bg-gray/20'} />
              <div className={'flex flex-col gap-1'}>
                <span className={'h-2 w-40 animate-pulse bg-gray/20'} />
                <span className={'h-2 w-28 animate-pulse bg-gray/20'} />
              </div>
            </div>
            <div className={'flex gap-3'}>
              {[1, 2, 3].map(el => (
                <span key={el} className={'h-[23px] w-20 animate-pulse rounded-md bg-gray/20'} />
              ))}
            </div>
            <span className={'h-8 w-8 animate-pulse rounded-md bg-gray/20'} />
          </div>
        ))}
      </div>
    </div>
  )
}
