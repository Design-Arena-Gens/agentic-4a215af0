import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JD Sports Canada - Best Discount Coupons',
  description: 'Find the best discount coupons and promo codes for JD Sports Canada',
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
