"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save, Upload, Trash2, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import type { SiteSettings } from "@/lib/types"

interface LogoTabProps {
  settings: SiteSettings
  onSave: (settings: SiteSettings) => Promise<void>
  isSaving: boolean
}

export function LogoTab({ settings, onSave, isSaving }: LogoTabProps) {
  const [formData, setFormData] = useState(settings)
  const [isUploading, setIsUploading] = useState(false)

  async function handleLogoUpload(file: File) {
    setIsUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append("file", file)
    formDataUpload.append("type", "logo")

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData((prev) => ({ ...prev, logo: data.url }))
        toast.success("Logo enviada com sucesso!")
      } else {
        toast.error("Erro ao enviar logo")
      }
    } catch {
      toast.error("Erro ao enviar logo")
    } finally {
      setIsUploading(false)
    }
  }

  async function handleFaviconUpload(file: File) {
    setIsUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append("file", file)
    formDataUpload.append("type", "favicon")

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData((prev) => ({ ...prev, favicon: data.url }))
        toast.success("Favicon enviado com sucesso!")
      } else {
        toast.error("Erro ao enviar favicon")
      }
    } catch {
      toast.error("Erro ao enviar favicon")
    } finally {
      setIsUploading(false)
    }
  }

  function removeLogo() {
    setFormData((prev) => ({ ...prev, logo: null }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Logo do Site</CardTitle>
          <CardDescription>Faça upload de uma nova logo ou altere a URL</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label>URL da Logo</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.logo || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, logo: e.target.value }))}
                    placeholder="https://exemplo.com/logo.png"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleLogoUpload(file)
                      }}
                    />
                    <Button type="button" variant="outline" disabled={isUploading} asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? "Enviando..." : "Upload"}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              {formData.logo && (
                <Button variant="outline" size="sm" onClick={removeLogo} className="text-destructive bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover Logo
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="w-64 h-32 rounded-lg border border-border bg-background flex items-center justify-center overflow-hidden">
                {formData.logo ? (
                  <Image
                    src={formData.logo || "/placeholder.svg"}
                    alt="Logo Preview"
                    width={240}
                    height={120}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                    <span className="text-sm">Sem logo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Favicon</CardTitle>
          <CardDescription>Ícone que aparece na aba do navegador</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label>URL do Favicon</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.favicon || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, favicon: e.target.value }))}
                    placeholder="/favicon.ico"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.ico"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFaviconUpload(file)
                      }}
                    />
                    <Button type="button" variant="outline" disabled={isUploading} asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? "Enviando..." : "Upload"}
                      </span>
                    </Button>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: .ico, .png, .jpg (recomendado: 32x32px)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="w-16 h-16 rounded-lg border border-border bg-background flex items-center justify-center overflow-hidden">
                {formData.favicon ? (
                  <img
                    src={formData.favicon || "/placeholder.svg"}
                    alt="Favicon Preview"
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
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
