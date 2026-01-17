"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save, Phone, Mail, MapPin, Clock } from "lucide-react"
import type { SiteSettings } from "@/lib/types"

interface SettingsTabProps {
  settings: SiteSettings
  onSave: (settings: SiteSettings) => Promise<void>
  isSaving: boolean
}

export function SettingsTab({ settings, onSave, isSaving }: SettingsTabProps) {
  const [formData, setFormData] = useState(settings)

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleAddressChange(field: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }))
  }

  function handleStatsChange(field: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      stats: { ...prev.stats, [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
          <CardDescription>Configure as informações básicas do site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nome do Site</Label>
              <Input
                id="siteName"
                value={formData.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  placeholder="(62) 99999-9999"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsappMessage">Mensagem Padrão WhatsApp</Label>
              <Input
                id="whatsappMessage"
                value={formData.whatsappMessage}
                onChange={(e) => handleChange("whatsappMessage", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessHours">Horário de Funcionamento</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="businessHours"
                value={formData.businessHours}
                onChange={(e) => handleChange("businessHours", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Endereço
          </CardTitle>
          <CardDescription>Configure o endereço exibido no site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Rua/Logradouro</Label>
            <Input
              id="street"
              value={formData.address.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={formData.address.neighborhood}
                onChange={(e) => handleAddressChange("neighborhood", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={formData.address.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={formData.address.zipCode}
                onChange={(e) => handleAddressChange("zipCode", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Estatísticas</CardTitle>
          <CardDescription>Números exibidos na seção inicial do site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="years">Anos de Experiência</Label>
              <Input
                id="years"
                value={formData.stats.years}
                onChange={(e) => handleStatsChange("years", e.target.value)}
                placeholder="30+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clients">Clientes Atendidos</Label>
              <Input
                id="clients"
                value={formData.stats.clients}
                onChange={(e) => handleStatsChange("clients", e.target.value)}
                placeholder="5000+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servicesCount">Serviços Realizados</Label>
              <Input
                id="servicesCount"
                value={formData.stats.services}
                onChange={(e) => handleStatsChange("services", e.target.value)}
                placeholder="15000+"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => onSave(formData)} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  )
}
