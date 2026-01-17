import { Logo } from "@/components/logo"
import { MapPin, Phone, Mail } from "lucide-react"
import type { SiteSettings } from "@/lib/types"

interface FooterProps {
  settings: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#030305] border-t border-cyan-500/10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <Logo settings={settings} size="md" />
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Manutenção especializada em equipamentos eletrônicos com mais de 30 anos de experiência no mercado.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Links Rápidos</h4>
            <nav className="flex flex-col gap-3">
              {["Início", "Sobre", "Serviços", "Diferenciais", "Contato"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace("í", "i")}`}
                  className="text-gray-500 hover:text-cyan-400 transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>
                  {settings.address.city} - {settings.address.state}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>{settings.whatsapp}</span>
              </div>
              {settings.email && (
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <span>{settings.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} {settings.siteName}. Todos os direitos reservados.
          </p>
          <p className="text-gray-700 text-xs">Desenvolvido com tecnologia de ponta</p>
        </div>
      </div>
    </footer>
  )
}
