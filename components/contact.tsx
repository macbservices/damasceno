import { MapPin, Clock, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SiteSettings } from "@/lib/types"

interface ContactProps {
  settings: SiteSettings
}

export function Contact({ settings }: ContactProps) {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d959.8659893856!2d-49.2248682!3d-16.6669931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef11fa3e0e0e1%3A0x1234567890abcdef!2sRua%2014%2C%20Quadra%2017%2C%20Lote%2016%2C%20Vila%20Morais%2C%20Goi%C3%A2nia%20-%20GO%2C%2074620-190!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"

  return (
    <section id="contato" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050508]" />
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Contato</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">{settings.contactTitle}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{settings.contactDescription}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative flex items-start gap-5 p-6 bg-[#0a0a12]/80 backdrop-blur-sm border border-cyan-500/10 rounded-2xl hover:border-cyan-500/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-7 w-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Endereço</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {settings.address.street}
                    <br />
                    {settings.address.neighborhood}
                    <br />
                    {settings.address.city} - {settings.address.state}
                    <br />
                    CEP {settings.address.zipCode}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative flex items-start gap-5 p-6 bg-[#0a0a12]/80 backdrop-blur-sm border border-green-500/10 rounded-2xl hover:border-green-500/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-7 w-7 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                  <p className="text-gray-400 text-lg">{settings.whatsapp}</p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            {settings.email && (
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                <div className="relative flex items-start gap-5 p-6 bg-[#0a0a12]/80 backdrop-blur-sm border border-amber-500/10 rounded-2xl hover:border-amber-500/30 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-7 w-7 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">E-mail</h3>
                    <p className="text-gray-400">{settings.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Hours Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all" />
              <div className="relative flex items-start gap-5 p-6 bg-[#0a0a12]/80 backdrop-blur-sm border border-red-500/10 rounded-2xl hover:border-red-500/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-7 w-7 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Horário de Funcionamento</h3>
                  <p className="text-gray-400">{settings.businessHours}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border-0 shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] transition-all duration-300 rounded-xl font-bold py-7 text-lg"
              asChild
            >
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(settings.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-6 w-6 mr-3" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-red-500/20 rounded-3xl blur-3xl opacity-30" />
            <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden border-2 border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <iframe
                src={mapUrl}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Damasceno Digital Tech"
              />
              {/* Map overlay for dark mode effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
