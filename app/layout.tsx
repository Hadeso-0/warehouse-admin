import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'
import { ScrollArea } from '@/components/ui/scroll-area'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: process.env.SHOP_NAME || "Dashboard",
  description: ( process.env.SHOP_NAME || "E-Commerce" ) + "Dashboard",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
            <ThemeProvider 
              attribute="class" 
              defaultTheme="system" 
              enableSystem
            >
              <ToastProvider />
              <ModalProvider />
              <ScrollArea className="h-screen w-screen">
                {children}
              </ScrollArea>
            </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
