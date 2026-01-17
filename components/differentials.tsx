import { CheckCircle, Shield, Award, HeadphonesIcon } from "lucide-react"
import type { SiteSettings } from "@/lib/types"

interface DifferentialsProps {
  settings: SiteSettings
}

const differentialIcons = [Award, CheckCircle, Shield, HeadphonesIcon]

export function Differentials({ settings }: DifferentialsProps) {
  return (
    <section id="diferenciais" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a15] to-[#050508]" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Por que nos escolher</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">{settings.differentialsTitle}</h2>
        </div>

        {/* Differentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {settings.differentials.map((differential, index) => {
            const Icon = differentialIcons[index % differentialIcons.length]
            const gradients = [
              "from-red-500 to-red-600",
              "from-cyan-500 to-blue-600",
              "from-amber-500 to-orange-600",
              "from-green-500 to-emerald-600",
            ]
            const glows = ["rgba(220,38,38,0.3)", "rgba(0,212,255,0.3)", "rgba(245,158,11,0.3)", "rgba(34,197,94,0.3)"]

            return (
              <div key={index} className="group relative">
                {/* Card */}
                <div className="relative h-full bg-[#0a0a12]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden">
                  {/* Top glow line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: `0 0 30px ${glows[index % glows.length]}` }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{differential.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{differential.description}</p>

                  {/* Hover effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${gradients[index % gradients.length].split(" ")[0].replace("from-", "")}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
