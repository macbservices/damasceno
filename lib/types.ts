export interface SiteSettings {
  siteName: string
  logo: string | null
  favicon: string | null
  whatsapp: string
  whatsappMessage: string
  email: string
  businessHours: string

  heroTitle: string
  heroDescription: string
  heroTagline: string

  aboutTitle: string
  aboutDescription: string
  aboutHighlights: string[]

  servicesTitle: string
  servicesDescription: string

  differentialsTitle: string
  differentials: Array<{
    title: string
    description: string
  }>

  contactTitle: string
  contactDescription: string

  address: {
    street: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }

  stats: {
    years: string
    clients: string
    services: string
  }

  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
}

export interface Service {
  id: string
  title: string
  description: string
  image: string | null
  order: number
  active: boolean
}

export interface AdminUser {
  username: string
  passwordHash: string
}
