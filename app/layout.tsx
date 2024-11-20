import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { AppProvider } from '@/components/app-provider'
import { Header } from '@/components/header'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Tree Message',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <div className='w-full h-full container mx-auto'>
            <Header />
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
