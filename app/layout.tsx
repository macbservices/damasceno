import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Damasceno Digital Tech - Manutenção Eletrônica",
  description:
    "Manutenção especializada em consertos de TVs, equipamentos de som, placas eletrônicas, equipamentos médico hospitalares e odontológicos, módulos de injeção eletrônica e inversores solares e de solda.",
  keywords: [
    "manutenção eletrônica",
    "conserto tv",
    "placas eletrônicas",
    "inversores solares",
    "equipamentos hospitalares",
    "Goiânia",
  ],
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
