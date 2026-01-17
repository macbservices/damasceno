import type { SiteSettings, Service, AdminUser } from "./types"

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined

// Dados padrão
const defaultSettings: SiteSettings = {
  siteName: "Damasceno Digital Tech",
  logo: "",
  favicon: "/favicon.ico",
  whatsapp: "5562982227276", // Atualizado com o número de WhatsApp real
  whatsappMessage: "Olá! Gostaria de solicitar um orçamento para manutenção eletrônica.",
  email: "contato@damascenodigitaltech.com.br",
  businessHours: "Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 12:00",

  heroTitle: "Manutenção especializada em consertos de tvs",
  heroDescription:
    "Manutenção especializada em consertos de tvs, equipamentos de som, placas eletrônicas, equipamentos médico hospitalares e odontológicos, módulos de injeção eletrônica e inversores solares e de solda.",
  heroTagline: "Profissional a mais de 3 décadas",

  aboutTitle: "Sobre a Empresa",
  aboutDescription:
    "A Damasceno Digital Tech, atua a mais de 3 décadas com precisão técnica e compromisso na manutenção de equipamentos eletrônicos. Trabalhamos com reparos residenciais, industriais e hospitalares, seguindo rigor técnico e critérios de segurança, garantindo confiança e durabilidade nos serviços prestados.",
  aboutHighlights: [
    "Reparos residenciais e industriais",
    "Equipamentos hospitalares e odontológicos",
    "Rigor técnico e segurança",
    "Garantia nos serviços",
  ],

  servicesTitle: "Serviços",
  servicesDescription: "Oferecemos uma ampla gama de serviços de manutenção eletrônica com qualidade e garantia.",

  differentialsTitle: "Diferenciais",
  differentials: [
    {
      title: "Profissional com experiência a mais de 3 décadas",
      description: "Mais de 30 anos de atuação no mercado de eletrônica",
    },
    {
      title: "Diagnóstico preciso e transparente",
      description: "Análise detalhada e honesta de cada equipamento",
    },
    {
      title: "Garantia nos serviços",
      description: "Todos os reparos com garantia de qualidade",
    },
    {
      title: "Atendimento sério e responsável",
      description: "Compromisso e respeito com cada cliente",
    },
  ],

  contactTitle: "Endereço",
  contactDescription: "Estamos prontos para atender você. Entre em contato pelo WhatsApp ou visite nossa oficina.",

  address: {
    street: "Rua 14, Quadra 17, Lote 16",
    neighborhood: "Vila Morais",
    city: "Goiânia",
    state: "GO",
    zipCode: "74620-190",
  },

  stats: {
    years: "30+",
    clients: "5000+",
    services: "15000+",
  },

  colors: {
    primary: "#dc2626",
    secondary: "#00d4ff",
    accent: "#f59e0b",
    background: "#050508",
  },
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "TVs",
    description: "Reparo, troca de componentes e ajustes técnicos.",
    image: "/images/service-tv.jpg",
    order: 1,
    active: true,
  },
  {
    id: "2",
    title: "Máquinas de Lavar",
    description: "Manutenção completa, correção de falhas e recuperação de placas.",
    image: "/images/service-washing.jpg",
    order: 2,
    active: true,
  },
  {
    id: "3",
    title: "Micro-ondas",
    description: "Reparo de placas, magnetron, transformador e sistema de segurança.",
    image: "/images/service-microwave.jpg",
    order: 3,
    active: true,
  },
  {
    id: "4",
    title: "Placas Eletrônicas em Geral",
    description:
      "Reparos de placas de: Máquinas de lavar e de costura, geladeiras, esteiras, ar-condicionado convencional e inverter.",
    image: "/images/service-circuit.jpg",
    order: 4,
    active: true,
  },
  {
    id: "5",
    title: "Inversores Solares e De Solda",
    description: "Reparo técnico, testes e manutenção preventiva e corretiva residenciais e industriais.",
    image: "/images/service-inverter.jpg",
    order: 5,
    active: true,
  },
  {
    id: "6",
    title: "Equipamentos Médico-Hospitalares e Odontológicos",
    description: "Manutenção técnica com padrões de segurança, calibração e confiabilidade.",
    image: "/images/service-medical.jpg",
    order: 6,
    active: true,
  },
]

const defaultAdmin: AdminUser = {
  username: "admin",
  passwordHash: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu5jO", // admin123
}

let memorySettings = { ...defaultSettings }
let memoryServices = [...defaultServices]
let memoryAdmin = { ...defaultAdmin }

async function getFileSystem() {
  if (isVercel) return null
  const fs = await import("fs").then((m) => m.promises)
  const path = await import("path")
  return { fs, path }
}

async function ensureDataDir() {
  const modules = await getFileSystem()
  if (!modules) return
  const { fs, path } = modules
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  if (isVercel) {
    // Retorna dados da memória no ambiente Vercel
    if (filename === "settings.json") return memorySettings as T
    if (filename === "services.json") return memoryServices as T
    if (filename === "admin.json") return memoryAdmin as T
    return defaultValue
  }

  const modules = await getFileSystem()
  if (!modules) return defaultValue

  const { fs, path } = modules
  await ensureDataDir()
  const filePath = path.join(process.cwd(), "data", filename)

  try {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch {
    await writeJsonFile(filename, defaultValue)
    return defaultValue
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  if (isVercel) {
    // Atualiza memória no ambiente Vercel (temporário, para preview)
    if (filename === "settings.json") memorySettings = data as SiteSettings
    if (filename === "services.json") memoryServices = data as Service[]
    if (filename === "admin.json") memoryAdmin = data as AdminUser
    return
  }

  const modules = await getFileSystem()
  if (!modules) return

  const { fs, path } = modules
  await ensureDataDir()
  const filePath = path.join(process.cwd(), "data", filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
}

export async function getSettings(): Promise<SiteSettings> {
  return readJsonFile("settings.json", defaultSettings)
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await writeJsonFile("settings.json", settings)
}

export async function getServices(): Promise<Service[]> {
  const services = await readJsonFile<Service[]>("services.json", defaultServices)
  return services.filter((s) => s.active).sort((a, b) => a.order - b.order)
}

export async function getAllServices(): Promise<Service[]> {
  const services = await readJsonFile<Service[]>("services.json", defaultServices)
  return services.sort((a, b) => a.order - b.order)
}

export async function saveServices(services: Service[]): Promise<void> {
  await writeJsonFile("services.json", services)
}

export async function getAdminUser(): Promise<AdminUser> {
  return readJsonFile("admin.json", defaultAdmin)
}

export async function saveAdminUser(admin: AdminUser): Promise<void> {
  await writeJsonFile("admin.json", admin)
}

export function getDefaultSettings(): SiteSettings {
  return defaultSettings
}

export function getDefaultServices(): Service[] {
  return defaultServices
}
