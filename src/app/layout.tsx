import '../styles/index.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dr. Yassmin Allam | Portfolio',
  description: 'Portfolio of DR. Yasmin',
  icons: {
    icon: [
      {
        url: 'https://l4lhmmpwsk.ufs.sh/f/e0aMZuFnt6Lg0mQeE5ZRS5l4Th1rsyQqbjHZUgGM7BCpfioX',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
    shortcut: 'https://l4lhmmpwsk.ufs.sh/f/e0aMZuFnt6Lg0mQeE5ZRS5l4Th1rsyQqbjHZUgGM7BCpfioX',
  },
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
