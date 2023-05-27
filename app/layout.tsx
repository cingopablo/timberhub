import './globals.css'

import { Mukta_Mahee } from 'next/font/google'
import React from 'react'

import { Header } from '@/components/Header'

const font = Mukta_Mahee({ weight: '400', subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'en'}>
      <body className={font.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
