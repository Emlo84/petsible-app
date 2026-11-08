import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[SupabaseClient] Advertencia: Las variables VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY no están definidas en el entorno. Asegúrate de configurar el archivo .env.'
  )
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

export const supabaseClient = supabase
export default supabase

