import '@/app/ui/global.css'
import { Inter } from 'next/font/google'
import ThemeToggle from "@/app/lib/theme-toggle";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rustez Pure Automator',
  description: 'Automate your Rust play',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <ThemeToggle></ThemeToggle>
    {children}
    </body>
    </html>
  )
}
