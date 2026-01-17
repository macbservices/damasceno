import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ChevronDown } from "lucide-react"
import type { SiteSettings } from "@/lib/types"
import { Logo } from "@/components/logo"

interface HeroProps {
  settings: SiteSettings
}

export function Hero({ settings }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/98 via-[#050508]/85 to-[#050508]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/60" />
      </div>

      {/* Animated Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Circuit Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="absolute w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M0 540 H400 L450 490 H800 L850 540 H1920"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0 600 H300 L350 650 H600 L650 600 H1920"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo settings={settings} size="lg" />
          </div>

          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">{settings.heroTagline}</span>
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 leading-tight text-balance">
            <span className="text-white">{settings.siteName}</span>
          </h1>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-500 bg-clip-text text-transparent">
              {settings.heroTitle}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-4xl mx-auto text-pretty leading-relaxed">
            {settings.heroDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              asChild
              className="text-lg px-10 py-7 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border-0 shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] transition-all duration-300 rounded-xl font-bold"
            >
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(settings.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-5 w-5 mr-2" />
                Solicitar Orçamento no WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-10 py-7 border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 bg-transparent text-cyan-400 hover:text-cyan-300 rounded-xl font-bold transition-all duration-300"
            >
              <a href="#servicos">Ver Serviços</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-[#0a0a0f]/80 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent">
                  {settings.stats.years}
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium uppercase tracking-wider">
                  Anos de Experiência
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-[#0a0a0f]/80 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {settings.stats.clients}
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium uppercase tracking-wider">
                  Clientes Atendidos
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  {settings.stats.services}
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium uppercase tracking-wider">
                  Serviços Realizados
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#sobre"
          className="flex flex-col items-center gap-2 text-cyan-400/60 hover:text-cyan-400 transition-colors group"
        >
          <span className="text-xs uppercase tracking-widest">Saiba mais</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
