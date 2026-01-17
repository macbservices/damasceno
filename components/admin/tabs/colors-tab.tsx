"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save, RefreshCw } from "lucide-react"
import type { SiteSettings } from "@/lib/types"

interface ColorsTabProps {
  settings: SiteSettings
  onSave: (settings: SiteSettings) => Promise<void>
  isSaving: boolean
}

const defaultColors = {
  primary: "#dc2626",
  secondary: "#00d4ff",
  accent: "#f59e0b",
  background: "#0a0a0a",
}

export function ColorsTab({ settings, onSave, isSaving }: ColorsTabProps) {
  const [formData, setFormData] = useState(settings)

  function handleColorChange(field: keyof typeof settings.colors, value: string) {
    setFormData((prev) => ({
      ...prev,
      colors: { ...prev.colors, [field]: value },
    }))
  }

  function resetColors() {
    setFormData((prev) => ({
      ...prev,
      colors: defaultColors,
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Esquema de Cores</CardTitle>
              <CardDescription>Personalize as cores do site</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={resetColors}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Resetar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="primary">Cor Primária (Vermelho)</Label>
              <div className="flex gap-3">
                <div
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                  style={{ backgroundColor: formData.colors.primary }}
                  onClick={() => document.getElementById("primary-picker")?.click()}
                />
                <input
                  id="primary-picker"
                  type="color"
                  value={formData.colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="sr-only"
                />
                <Input
                  id="primary"
                  value={formData.colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Usada em botões, links e destaques principais</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="secondary">Cor Secundária (Ciano)</Label>
              <div className="flex gap-3">
                <div
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                  style={{ backgroundColor: formData.colors.secondary }}
                  onClick={() => document.getElementById("secondary-picker")?.click()}
                />
                <input
                  id="secondary-picker"
                  type="color"
                  value={formData.colors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="sr-only"
                />
                <Input
                  id="secondary"
                  value={formData.colors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Usada em elementos secundários e estatísticas</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="accent">Cor de Destaque (Dourado)</Label>
              <div className="flex gap-3">
                <div
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                  style={{ backgroundColor: formData.colors.accent }}
                  onClick={() => document.getElementById("accent-picker")?.click()}
                />
                <input
                  id="accent-picker"
                  type="color"
                  value={formData.colors.accent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                  className="sr-only"
                />
                <Input
                  id="accent"
                  value={formData.colors.accent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Usada em ícones e destaques especiais</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="background">Cor de Fundo</Label>
              <div className="flex gap-3">
                <div
                  className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                  style={{ backgroundColor: formData.colors.background }}
                  onClick={() => document.getElementById("background-picker")?.click()}
                />
                <input
                  id="background-picker"
                  type="color"
                  value={formData.colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="sr-only"
                />
                <Input
                  id="background"
                  value={formData.colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Cor de fundo principal do site</p>
            </div>
          </div>

          <div
            className="mt-8 p-6 rounded-xl border border-border"
            style={{ backgroundColor: formData.colors.background }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Preview das Cores</h3>
            <div className="flex flex-wrap gap-4">
              <Button style={{ backgroundColor: formData.colors.primary, color: "white" }}>Botão Primário</Button>
              <Button style={{ backgroundColor: formData.colors.secondary, color: "black" }}>Botão Secundário</Button>
              <Button style={{ backgroundColor: formData.colors.accent, color: "black" }}>Botão Destaque</Button>
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              <span style={{ color: formData.colors.primary }}>Texto Primário</span>
              <span style={{ color: formData.colors.secondary }}>Texto Secundário</span>
              <span style={{ color: formData.colors.accent }}>Texto Destaque</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => onSave(formData)} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar Cores"}
        </Button>
      </div>
    </div>
  )
}
