import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Tv, WashingMachine, Microwave, CircuitBoard, Sun, Stethoscope } from "lucide-react"
import type { Service, SiteSettings } from "@/lib/types"

interface ServicesProps {
  services: Service[]
  settings: SiteSettings
}

const serviceIcons: Record<string, React.ElementType> = {
  TVs: Tv,
  "Máquinas de Lavar": WashingMachine,
  "Micro-ondas": Microwave,
  "Placas Eletrônicas em Geral": CircuitBoard,
  "Inversores Solares e De Solda": Sun,
  "Equipamentos Médico-Hospitalares e Odontológicos": Stethoscope,
}

export function Services({ services, settings }: ServicesProps) {
  return (
    <section id="servicos" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050508]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Nossos Serviços</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">{settings.servicesTitle}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{settings.servicesDescription}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.title] || CircuitBoard
            const colors = [
              { border: "border-cyan-500", bg: "bg-cyan-500", text: "text-cyan-500", glow: "from-cyan-500/20" },
              { border: "border-red-500", bg: "bg-red-500", text: "text-red-500", glow: "from-red-500/20" },
              { border: "border-amber-500", bg: "bg-amber-500", text: "text-amber-500", glow: "from-amber-500/20" },
            ]
            const color = colors[index % colors.length]

            const getServiceImage = (title: string, customImage?: string) => {
              if (customImage && customImage.startsWith("/")) return customImage
              const images: Record<string, string> = {
                TVs: "/images/service-tv.jpg",
                "Máquinas de Lavar": "/images/service-washing.jpg",
                "Micro-ondas": "/images/service-microwave.jpg",
                "Placas Eletrônicas em Geral": "/images/service-circuit.jpg",
                "Inversores Solares e De Solda": "/images/service-inverter.jpg",
                "Equipamentos Médico-Hospitalares e Odontológicos": "/images/service-medical.jpg",
              }
              return (
                images[title] ||
                `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(title + " repair service")}`
              )
            }

            const imageUrl = getServiceImage(service.title, service.image)

            return (
              <div key={service.id} className="group relative">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${color.glow} to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                />

                <div className="relative bg-[#0a0a12]/90 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden h-full">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />

                    {/* Icon floating */}
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 rounded-xl ${color.bg}/20 backdrop-blur-sm border ${color.border}/30 flex items-center justify-center`}
                    >
                      <Icon className={`h-6 w-6 ${color.text}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3">{service.description}</p>

                    <Button
                      variant="ghost"
                      className={`p-0 h-auto font-semibold ${color.text} hover:text-white hover:bg-transparent group/btn`}
                      asChild
                    >
                      <a
                        href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o serviço de ${service.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Solicitar Orçamento
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>

                  {/* Bottom line accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent ${color.text} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border-0 shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] transition-all duration-300 rounded-xl font-bold px-10 py-7 text-lg"
          >
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chamar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
