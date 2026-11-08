import type { AuthError, Session, User } from '@supabase/supabase-js'
import { supabase } from './client'

export interface AuthResponse<T> {
  data: T | null
  error: string | null
}

export interface RegisterDTO {
  email: string
  password: string
  fullName: string
}

export interface LoginDTO {
  email: string
  password: string
}

/**
 * Servicio de Autenticación con Supabase.
 * - Las contraseñas viajan bajo HTTPS y Supabase las procesa mediante
 *   algoritmos robustos de hashing (bcrypt/Argon2) en el servicio GoTrue.
 * - Nunca se almacenan ni transmiten en texto plano en la base de datos de la app.
 */
export class AuthService {
  /**
   * Registra un nuevo usuario con hashing seguro de credenciales.
   */
  public static async register({
    email,
    password,
    fullName,
  }: RegisterDTO): Promise<AuthResponse<{ user: User | null; session: Session | null }>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: 'adopter',
          },
        },
      })

      if (error) {
        return { data: null, error: this.mapAuthError(error) }
      }

      return { data, error: null }
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Error inesperado durante el registro.',
      }
    }
  }

  /**
   * Inicia sesión con email y contraseña.
   */
  public static async login({
    email,
    password,
  }: LoginDTO): Promise<AuthResponse<{ user: User; session: Session }>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (error) {
        return { data: null, error: this.mapAuthError(error) }
      }

      if (!data.user || !data.session) {
        return { data: null, error: 'Credenciales inválidas.' }
      }

      return { data: { user: data.user, session: data.session }, error: null }
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Error inesperado al iniciar sesión.',
      }
    }
  }

  /**
   * Cierra la sesión activa del usuario.
   */
  public static async logout(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        return { error: error.message }
      }
      return { error: null }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Error al cerrar sesión.' }
    }
  }

  /**
   * Obtiene la sesión actual persistida.
   */
  public static async getCurrentSession(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession()
    return data.session
  }

  /**
   * Obtiene el usuario actual.
   */
  public static async getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser()
    return data.user
  }

  /**
   * Suscribe a cambios en el estado de autenticación.
   */
  public static onAuthStateChange(callback: (session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session)
    })
  }

  /**
   * Reenvía el correo de confirmación de registro.
   */
  public static async resendConfirmationEmail(email: string): Promise<AuthResponse<boolean>> {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
      })
      if (error) {
        return { data: false, error: this.mapAuthError(error) }
      }
      return { data: true, error: null }
    } catch (err) {
      return {
        data: false,
        error: err instanceof Error ? err.message : 'Error al reenviar el correo de confirmación.',
      }
    }
  }

  private static mapAuthError(error: AuthError): string {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Correo o contraseña incorrectos.'
      case 'User already registered':
        return 'Ya existe una cuenta registrada con este correo.'
      case 'Password should be at least 6 characters':
        return 'La contraseña debe tener al menos 6 caracteres.'
      case 'Email not confirmed':
        return 'Tu correo electrónico aún no ha sido confirmado. Por favor revisa tu bandeja de entrada o spam.'
      default:
        return error.message || 'Error al iniciar sesión.'
    }
  }
}
