import './globals.css'

import { Mukta_Mahee } from 'next/font/google'
import React from 'react'

import { Header } from '@/components/Header'

const mukta = Mukta_Mahee({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'en'}>
      <body className={mukta.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
