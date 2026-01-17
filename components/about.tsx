import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Cpu, CircuitBoard, Zap, Settings } from "lucide-react"
import type { SiteSettings } from "@/lib/types"

interface AboutProps {
  settings: SiteSettings
}

export function About({ settings }: AboutProps) {
  const icons = [Cpu, CircuitBoard, Zap, Settings]

  return (
    <section id="sobre" className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a12] to-[#050508]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>

      {/* Circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="circuitPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 H8 M12 10 H20 M10 0 V8 M10 12 V20" stroke="#00d4ff" strokeWidth="0.5" fill="none" />
            <circle cx="10" cy="10" r="2" fill="#00d4ff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                  <Image
                    src="/professional-electronics-workbench-with-oscillosco.jpg"
                    alt="Bancada de eletrônica profissional"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/50 rounded-2xl transition-all" />
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image
                    src="/multimeter-and-soldering-tools.jpg"
                    alt="Ferramentas de eletrônica"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image
                    src="/technician-repairing-circuit-board.jpg"
                    alt="Técnico trabalhando"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                  <Image
                    src="/modern-electronics-repair-shop.jpg"
                    alt="Oficina de eletrônica"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.4)]">
              <div className="text-4xl font-black">{settings.stats.years}</div>
              <div className="text-sm font-medium opacity-90">Anos de Experiência</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Sobre a Empresa</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              {settings.aboutTitle}
            </h2>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed text-pretty">{settings.aboutDescription}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {settings.aboutHighlights.map((highlight, index) => {
                const Icon = icons[index % icons.length]
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#0a0a12]/80 border border-cyan-500/10 hover:border-cyan-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-cyan-500/30 group-hover:to-cyan-600/30 transition-all">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">{highlight}</span>
                  </div>
                )
              })}
            </div>

            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-0 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all duration-300 rounded-xl font-bold px-8 py-6 text-lg"
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
          </div>
        </div>
      </div>
    </section>
  )
}
