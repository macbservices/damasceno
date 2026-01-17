"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SettingsTab } from "./tabs/settings-tab"
import { ServicesTab } from "./tabs/services-tab"
import { ColorsTab } from "./tabs/colors-tab"
import { TextsTab } from "./tabs/texts-tab"
import { LogoTab } from "./tabs/logo-tab"
import { SecurityTab } from "./tabs/security-tab"
import { Settings, Wrench, Palette, Type, ImageIcon, Shield, LogOut, Eye, Home } from "lucide-react"
import { toast } from "sonner"
import type { SiteSettings, Service } from "@/lib/types"

interface AdminDashboardProps {
  initialSettings: SiteSettings
  initialServices: Service[]
}

export function AdminDashboard({ initialSettings, initialServices }: AdminDashboardProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  async function handleSaveSettings(newSettings: SiteSettings) {
    setIsSaving(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      })

      if (res.ok) {
        setSettings(newSettings)
        toast.success("Configurações salvas com sucesso!")
      } else {
        toast.error("Erro ao salvar configurações")
      }
    } catch {
      toast.error("Erro ao salvar configurações")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleSaveServices(newServices: Service[]) {
    setIsSaving(true)
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newServices),
      })

      if (res.ok) {
        setServices(newServices)
        toast.success("Serviços salvos com sucesso!")
      } else {
        toast.error("Erro ao salvar serviços")
      }
    } catch {
      toast.error("Erro ao salvar serviços")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Painel Admin</h1>
              <p className="text-xs text-muted-foreground">{settings.siteName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                <Eye className="h-4 w-4 mr-2" />
                Ver Site
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/">
                <Home className="h-4 w-4 mr-2" />
                Início
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-2 bg-card/50">
            <TabsTrigger value="settings" className="flex items-center gap-2 py-3">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Geral</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2 py-3">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Serviços</span>
            </TabsTrigger>
            <TabsTrigger value="texts" className="flex items-center gap-2 py-3">
              <Type className="h-4 w-4" />
              <span className="hidden sm:inline">Textos</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2 py-3">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Cores</span>
            </TabsTrigger>
            <TabsTrigger value="logo" className="flex items-center gap-2 py-3">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Logo</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 py-3">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <SettingsTab settings={settings} onSave={handleSaveSettings} isSaving={isSaving} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesTab services={services} onSave={handleSaveServices} isSaving={isSaving} />
          </TabsContent>

          <TabsContent value="texts">
            <TextsTab settings={settings} onSave={handleSaveSettings} isSaving={isSaving} />
          </TabsContent>

          <TabsContent value="colors">
            <ColorsTab settings={settings} onSave={handleSaveSettings} isSaving={isSaving} />
          </TabsContent>

          <TabsContent value="logo">
            <LogoTab settings={settings} onSave={handleSaveSettings} isSaving={isSaving} />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
