import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { getSettings, getAllServices } from "@/lib/data"
import { verifyToken } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  if (!token || !(await verifyToken(token))) {
    redirect("/admin/login")
  }

  const settings = await getSettings()
  const services = await getAllServices()

  return <AdminDashboard initialSettings={settings} initialServices={services} />
}
