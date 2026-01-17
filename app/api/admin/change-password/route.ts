import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAdminUser, saveAdminUser } from "@/lib/data"
import { verifyToken, verifyPassword, hashPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    const admin = await getAdminUser()

    const isValid = verifyPassword(currentPassword, admin.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: "Senha atual incorreta" }, { status: 400 })
    }

    const newHash = hashPassword(newPassword)
    await saveAdminUser({ ...admin, passwordHash: newHash })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error changing password:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
