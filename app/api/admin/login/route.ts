import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAdminUser } from "@/lib/data"
import { verifyPassword, createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const admin = await getAdminUser()

    if (username !== admin.username) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    const isValid = verifyPassword(password, admin.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

    const token = createToken(username)

    const cookieStore = await cookies()
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
