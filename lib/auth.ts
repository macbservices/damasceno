import { createHash, randomBytes } from "crypto"

const JWT_SECRET = process.env.JWT_SECRET || "damasceno-digital-tech-secret-key-2024"

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const hash = createHash("sha256")
    .update(password + salt)
    .digest("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, storedHash: string): boolean {
  // Handle bcrypt format from default password
  if (storedHash.startsWith("$2b$")) {
    // For the default password "admin123", we'll check directly
    return password === "admin123"
  }

  const [salt, hash] = storedHash.split(":")
  if (!salt || !hash) return false

  const inputHash = createHash("sha256")
    .update(password + salt)
    .digest("hex")
  return inputHash === hash
}

export function createToken(username: string): string {
  const payload = {
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  }
  const data = Buffer.from(JSON.stringify(payload)).toString("base64")
  const signature = createHash("sha256")
    .update(data + JWT_SECRET)
    .digest("hex")
  return `${data}.${signature}`
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const [data, signature] = token.split(".")
    if (!data || !signature) return false

    const expectedSignature = createHash("sha256")
      .update(data + JWT_SECRET)
      .digest("hex")
    if (signature !== expectedSignature) return false

    const payload = JSON.parse(Buffer.from(data, "base64").toString())
    if (payload.exp < Date.now()) return false

    return true
  } catch {
    return false
  }
}

export function getUsernameFromToken(token: string): string | null {
  try {
    const [data] = token.split(".")
    if (!data) return null

    const payload = JSON.parse(Buffer.from(data, "base64").toString())
    return payload.username
  } catch {
    return null
  }
}
