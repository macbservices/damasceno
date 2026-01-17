"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Save, Trash2, GripVertical, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import type { Service } from "@/lib/types"

interface ServicesTabProps {
  services: Service[]
  onSave: (services: Service[]) => Promise<void>
  isSaving: boolean
}

export function ServicesTab({ services, onSave, isSaving }: ServicesTabProps) {
  const [formData, setFormData] = useState<Service[]>(services)
  const [editingId, setEditingId] = useState<string | null>(null)

  function addService() {
    const newService: Service = {
      id: Date.now().toString(),
      title: "Novo Serviço",
      description: "Descrição do serviço",
      image: null,
      order: formData.length + 1,
      active: true,
    }
    setFormData([...formData, newService])
    setEditingId(newService.id)
  }

  function updateService(id: string, field: keyof Service, value: string | boolean | number | null) {
    setFormData(formData.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  function deleteService(id: string) {
    if (formData.length <= 1) {
      toast.error("Você precisa ter pelo menos um serviço")
      return
    }
    setFormData(formData.filter((s) => s.id !== id))
    setEditingId(null)
  }

  function moveService(id: string, direction: "up" | "down") {
    const index = formData.findIndex((s) => s.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === formData.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newData = [...formData]
    ;[newData[index], newData[newIndex]] = [newData[newIndex], newData[index]]
    newData.forEach((s, i) => (s.order = i + 1))
    setFormData(newData)
  }

  async function handleImageUpload(serviceId: string, file: File) {
    const formDataUpload = new FormData()
    formDataUpload.append("file", file)
    formDataUpload.append("type", "service")

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      })

      if (res.ok) {
        const data = await res.json()
        updateService(serviceId, "image", data.url)
        toast.success("Imagem enviada com sucesso!")
      } else {
        toast.error("Erro ao enviar imagem")
      }
    } catch {
      toast.error("Erro ao enviar imagem")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Gerenciar Serviços</h2>
          <p className="text-sm text-muted-foreground">Adicione, edite ou remova serviços do site</p>
        </div>
        <Button onClick={addService}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      <div className="grid gap-4">
        {formData.map((service, index) => (
          <Card
            key={service.id}
            className={`bg-card/50 border-border transition-all ${editingId === service.id ? "ring-2 ring-primary" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveService(service.id, "up")}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={index === 0}
                    >
                      <GripVertical className="h-4 w-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => moveService(service.id, "down")}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                      disabled={index === formData.length - 1}
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>Ordem: {service.order}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={service.active}
                      onCheckedChange={(checked) => updateService(service.id, "active", checked)}
                    />
                    <span className="text-sm text-muted-foreground">{service.active ? "Ativo" : "Inativo"}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingId(editingId === service.id ? null : service.id)}
                  >
                    <span className="sr-only">Editar</span>
                    {editingId === service.id ? "✓" : "✎"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => deleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {editingId === service.id && (
              <CardContent className="space-y-4 border-t border-border pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input value={service.title} onChange={(e) => updateService(service.id, "title", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Imagem</Label>
                    <div className="flex gap-2">
                      <Input
                        value={service.image || ""}
                        onChange={(e) => updateService(service.id, "image", e.target.value)}
                        placeholder="URL da imagem ou faça upload"
                      />
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(service.id, file)
                          }}
                        />
                        <Button type="button" variant="outline" size="icon" asChild>
                          <span>
                            <ImageIcon className="h-4 w-4" />
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateService(service.id, "description", e.target.value)}
                    rows={3}
                  />
                </div>

                {service.image && (
                  <div className="mt-4">
                    <Label>Preview da Imagem</Label>
                    <div className="mt-2 relative aspect-video max-w-xs rounded-lg overflow-hidden border border-border">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => onSave(formData)} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar Serviços"}
        </Button>
      </div>
    </div>
  )
}
