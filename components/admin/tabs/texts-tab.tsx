"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Save, Plus, Trash2 } from "lucide-react"
import type { SiteSettings } from "@/lib/types"

interface TextsTabProps {
  settings: SiteSettings
  onSave: (settings: SiteSettings) => Promise<void>
  isSaving: boolean
}

export function TextsTab({ settings, onSave, isSaving }: TextsTabProps) {
  const [formData, setFormData] = useState(settings)

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleHighlightChange(index: number, value: string) {
    const newHighlights = [...formData.aboutHighlights]
    newHighlights[index] = value
    setFormData((prev) => ({ ...prev, aboutHighlights: newHighlights }))
  }

  function addHighlight() {
    setFormData((prev) => ({
      ...prev,
      aboutHighlights: [...prev.aboutHighlights, "Novo destaque"],
    }))
  }

  function removeHighlight(index: number) {
    if (formData.aboutHighlights.length <= 1) return
    const newHighlights = formData.aboutHighlights.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, aboutHighlights: newHighlights }))
  }

  function handleDifferentialChange(index: number, field: "title" | "description", value: string) {
    const newDifferentials = [...formData.differentials]
    newDifferentials[index] = { ...newDifferentials[index], [field]: value }
    setFormData((prev) => ({ ...prev, differentials: newDifferentials }))
  }

  function addDifferential() {
    setFormData((prev) => ({
      ...prev,
      differentials: [...prev.differentials, { title: "Novo Diferencial", description: "Descrição do diferencial" }],
    }))
  }

  function removeDifferential(index: number) {
    if (formData.differentials.length <= 1) return
    const newDifferentials = formData.differentials.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, differentials: newDifferentials }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Seção Hero (Início)</CardTitle>
          <CardDescription>Textos da seção principal do site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroTagline">Tagline</Label>
            <Input
              id="heroTagline"
              value={formData.heroTagline}
              onChange={(e) => handleChange("heroTagline", e.target.value)}
              placeholder="Mais de 30 anos de experiência"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroTitle">Título Principal</Label>
            <Input
              id="heroTitle"
              value={formData.heroTitle}
              onChange={(e) => handleChange("heroTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroDescription">Descrição</Label>
            <Textarea
              id="heroDescription"
              value={formData.heroDescription}
              onChange={(e) => handleChange("heroDescription", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Seção Sobre</CardTitle>
          <CardDescription>Textos da seção "Sobre a Empresa"</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aboutTitle">Título</Label>
            <Input
              id="aboutTitle"
              value={formData.aboutTitle}
              onChange={(e) => handleChange("aboutTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutDescription">Descrição</Label>
            <Textarea
              id="aboutDescription"
              value={formData.aboutDescription}
              onChange={(e) => handleChange("aboutDescription", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Destaques</Label>
              <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-2">
              {formData.aboutHighlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Input value={highlight} onChange={(e) => handleHighlightChange(index, e.target.value)} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHighlight(index)}
                    disabled={formData.aboutHighlights.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Seção Serviços</CardTitle>
          <CardDescription>Textos da seção de serviços</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="servicesTitle">Título</Label>
            <Input
              id="servicesTitle"
              value={formData.servicesTitle}
              onChange={(e) => handleChange("servicesTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="servicesDescription">Descrição</Label>
            <Textarea
              id="servicesDescription"
              value={formData.servicesDescription}
              onChange={(e) => handleChange("servicesDescription", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Seção Diferenciais</CardTitle>
          <CardDescription>Destaques e diferenciais da empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="differentialsTitle">Título da Seção</Label>
            <Input
              id="differentialsTitle"
              value={formData.differentialsTitle}
              onChange={(e) => handleChange("differentialsTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Diferenciais</Label>
              <Button type="button" variant="outline" size="sm" onClick={addDifferential}>
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-4">
              {formData.differentials.map((diff, index) => (
                <div key={index} className="p-4 rounded-lg border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Diferencial {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDifferential(index)}
                      disabled={formData.differentials.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={diff.title}
                    onChange={(e) => handleDifferentialChange(index, "title", e.target.value)}
                    placeholder="Título"
                  />
                  <Input
                    value={diff.description}
                    onChange={(e) => handleDifferentialChange(index, "description", e.target.value)}
                    placeholder="Descrição"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Seção Contato</CardTitle>
          <CardDescription>Textos da seção de contato</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactTitle">Título</Label>
            <Input
              id="contactTitle"
              value={formData.contactTitle}
              onChange={(e) => handleChange("contactTitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactDescription">Descrição</Label>
            <Textarea
              id="contactDescription"
              value={formData.contactDescription}
              onChange={(e) => handleChange("contactDescription", e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => onSave(formData)} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar Textos"}
        </Button>
      </div>
    </div>
  )
}
