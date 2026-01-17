import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Differentials } from "@/components/differentials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getSettings, getServices } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function Home() {
  const settings = await getSettings()
  const services = await getServices()

  return (
    <main className="min-h-screen bg-[#050508] overflow-hidden">
      <Header settings={settings} />
      <Hero settings={settings} />
      <About settings={settings} />
      <Services services={services} settings={settings} />
      <Differentials settings={settings} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </main>
  )
}
