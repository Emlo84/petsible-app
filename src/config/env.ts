/**
 * Configuración y validación de variables de entorno.
 * Previene fallos silenciosos si faltan credenciales críticas.
 */

export const ENV = {
  SUPABASE_URL:
    import.meta.env.VITE_SUPABASE_URL ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://demo-petsible.supabase.co',
  SUPABASE_ANON_KEY:
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    'demo-anon-key',
  IS_PRODUCTION: import.meta.env.PROD,
} as const

export function validateEnvironment(): void {
  const missingKeys: string[] = []

  if (!import.meta.env.VITE_SUPABASE_URL) {
    missingKeys.push('VITE_SUPABASE_URL')
  }
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    missingKeys.push('VITE_SUPABASE_ANON_KEY')
  }

  if (missingKeys.length > 0 && import.meta.env.PROD) {
    throw new Error(`[Env Config] Faltan variables de entorno requeridas: ${missingKeys.join(', ')}`)
  }
}
