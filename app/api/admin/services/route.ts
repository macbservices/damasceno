import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAllServices, saveServices } from "@/lib/data"
import { verifyToken } from "@/lib/auth"
import type { Service } from "@/lib/types"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const services = await getAllServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error getting services:", error)
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

    const services: Service[] = await request.json()
    await saveServices(services)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving services:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
