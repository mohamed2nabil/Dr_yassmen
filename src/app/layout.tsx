import '../styles/index.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DR. Yasmin',
  description: 'Portfolio of DR. Yasmin',
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
