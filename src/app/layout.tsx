import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TOME - AI-Driven Training in 72 Hours',
  description: 'Transform your SOPs into polished training assets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
