import type { SiteSettings } from "@/lib/types"
import Image from "next/image"

interface LogoProps {
  settings: SiteSettings
  size?: "sm" | "md" | "lg"
}

export function Logo({ settings, size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 120, height: 40, text: "text-lg" },
    md: { width: 180, height: 60, text: "text-2xl" },
    lg: { width: 280, height: 90, text: "text-4xl" },
  }

  const { width, height, text } = sizes[size]

  if (settings.logo && settings.logo !== "/favicon.ico") {
    return (
      <Image
        src={settings.logo || "/placeholder.svg"}
        alt={settings.siteName}
        width={width}
        height={height}
        className="h-auto w-auto object-contain"
        style={{ maxHeight: height, maxWidth: width }}
        unoptimized
      />
    )
  }

  // Logo SVG estilizada baseada na imagem do cliente
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg
          width={size === "lg" ? 60 : size === "md" ? 45 : 35}
          height={size === "lg" ? 60 : size === "md" ? 45 : 35}
          viewBox="0 0 60 60"
          fill="none"
          className="drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        >
          {/* Círculo externo com gradiente */}
          <circle cx="30" cy="30" r="28" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />

          {/* D estilizado */}
          <path d="M20 15 L20 45 L35 45 C45 45 50 38 50 30 C50 22 45 15 35 15 L20 15 Z" fill="url(#logoGradient2)" />
          <path d="M25 20 L25 40 L33 40 C40 40 44 35 44 30 C44 25 40 20 33 20 L25 20 Z" fill="#050508" />

          {/* Pontos de circuito */}
          <circle cx="15" cy="20" r="2.5" fill="#dc2626" className="animate-pulse" />
          <circle cx="12" cy="30" r="2" fill="#dc2626" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
          <circle cx="15" cy="40" r="2.5" fill="#dc2626" className="animate-pulse" style={{ animationDelay: "0.4s" }} />

          {/* Linhas de circuito */}
          <path d="M15 20 L10 20 M12 30 L6 30 M15 40 L10 40" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />

          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`${text} font-black tracking-tight`}>
          <span className="text-white">DAMASCENO</span>
        </span>
        <div className="flex items-center gap-2 -mt-1">
          <span className="text-gray-400 text-xs font-semibold tracking-[0.2em]">DIGITAL TECH</span>
          <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            ELETRÔNICA
          </span>
        </div>
      </div>
    </div>
  )
}
