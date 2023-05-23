'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import logo from '../public/logo.svg'

export const Header = () => {
  const router = useRouter()
  return (
    <header className={'px-6 py-3 shadow-header'}>
      <Image src={logo} alt={'Timberhub'} onClick={() => router.push('/')} className={'cursor-pointer'} />
    </header>
  )
}
