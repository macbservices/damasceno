import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSettings, saveSettings } from "@/lib/data"
import { verifyToken } from "@/lib/auth"
import type { SiteSettings } from "@/lib/types"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error getting settings:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const settings: SiteSettings = await request.json()
    await saveSettings(settings)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving settings:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
