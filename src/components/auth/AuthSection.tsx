import React, { useState } from 'react'
import { AuthService } from '../../services/supabase/authService'
import type { Session, User } from '@supabase/supabase-js'

interface AuthSectionProps {
  initialTab?: 'register' | 'login'
  onAuthSuccess?: (user: User, session: Session) => void
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  initialTab = 'register',
  onAuthSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>(initialTab)

  // Registro State
  const [regNombre, setRegNombre] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regTelefono, setRegTelefono] = useState('')
  const [regNacimiento, setRegNacimiento] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regHabeasData, setRegHabeasData] = useState(false)

  // Login State
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // UI / Status State
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Validación de mayoría de edad (+18 años en Colombia)
  const esMayorDeEdad = (fechaStr: string): boolean => {
    if (!fechaStr) return false
    const nacimiento = new Date(fechaStr)
    const hoy = new Date()
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const m = hoy.getMonth() - nacimiento.getMonth()
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad >= 18
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    // Validaciones de negocio
    if (!esMayorDeEdad(regNacimiento)) {
      setErrorMsg('De acuerdo con la legislación colombiana y los convenios de bienestar animal, debes tener al menos 18 años cumplidos.')
      return
    }

    if (!regHabeasData) {
      setErrorMsg('Debes autorizar la política de datos (Ley 1581 de 2012) para continuar.')
      return
    }

    if (regPassword.length < 8) {
      setErrorMsg('La contraseña debe tener un mínimo de 8 caracteres seguros.')
      return
    }

    setIsLoading(true)

    try {
      const response = await AuthService.register({
        email: regEmail,
        password: regPassword,
        fullName: regNombre,
      })

      if (response.error) {
        setErrorMsg(response.error)
      } else {
        setSuccessMsg('¡Bienvenido a Pet-sible Bogotá! Tu cuenta fue creada exitosamente.')
        if (response.data?.user && response.data?.session) {
          onAuthSuccess?.(response.data.user, response.data.session)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)
    setIsLoading(true)

    try {
      const response = await AuthService.login({
        email: loginEmail,
        password: loginPassword,
      })

      if (response.error) {
        setErrorMsg(response.error)
      } else if (response.data) {
        setSuccessMsg(`¡Hola de nuevo! Sesión iniciada como ${response.data.user.email}`)
        onAuthSuccess?.(response.data.user, response.data.session)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-space-xl px-margin md:px-margin-tablet lg:px-margin-desktop bg-surface" id="seccion-auth">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-space-xs mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
            Empieza Tu Historia
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
            Crea Tu Cuenta de Adopción Responsable
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            Gestiona tus solicitudes de adopción, agenda visitas a los refugios en Bogotá y recibe alertas personalizadas según tus preferencias de espacio.
          </p>
        </div>

        {/* Tarjeta Unificada de Autenticación con Pestañas Accesibles */}
        <div className="bg-surface-container-low rounded-2xl shadow-lg p-space-md sm:p-space-xl border border-surface-container">
          {/* Switch de Pestañas */}
          <div aria-label="Opciones de acceso" className="grid grid-cols-2 p-1.5 bg-surface-container rounded-xl max-w-md mx-auto mb-space-lg" role="tablist">
            <button
              aria-controls="panel-register"
              aria-selected={activeTab === 'register'}
              onClick={() => {
                setActiveTab('register')
                setErrorMsg(null)
              }}
              className={`py-space-sm px-space-md rounded-lg font-label-md text-label-md font-bold transition-all ${
                activeTab === 'register'
                  ? 'text-on-primary bg-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              id="tab-register"
              role="tab"
              type="button"
            >
              Registrarse
            </button>
            <button
              aria-controls="panel-login"
              aria-selected={activeTab === 'login'}
              onClick={() => {
                setActiveTab('login')
                setErrorMsg(null)
              }}
              className={`py-space-sm px-space-md rounded-lg font-label-md text-label-md font-bold transition-all ${
                activeTab === 'login'
                  ? 'text-on-primary bg-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              id="tab-login"
              role="tab"
              type="button"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Mensajes de Alerta y Notificación */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-error">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-space-lg rounded-xl bg-secondary-container text-on-secondary-container text-center space-y-space-sm">
              <span className="material-symbols-outlined text-headline-lg text-secondary">check_circle</span>
              <h3 className="font-headline-sm text-headline-sm font-bold">¡Bienvenido a Pet-sible Bogotá!</h3>
              <p className="font-body-md text-body-md">{successMsg}</p>
            </div>
          )}

          {/* PANEL 1: REGISTRO CON VALIDACIONES CLAVE */}
          {activeTab === 'register' && !successMsg && (
            <div aria-labelledby="tab-register" id="panel-register" role="tabpanel">
              <form onSubmit={handleRegisterSubmit} className="space-y-space-md" id="form-registro" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {/* Nombre Completo */}
                  <div className="space-y-1.5">
                    <label className="block font-label-md text-label-md text-on-surface" htmlFor="reg-nombre">
                      Nombre y Apellidos <span aria-hidden="true" className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-body-md">badge</span>
                      </span>
                      <input
                        id="reg-nombre"
                        value={regNombre}
                        onChange={(e) => setRegNombre(e.target.value)}
                        name="nombre"
                        placeholder="Ej. Camila Morales Duque"
                        required
                        type="text"
                        className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface text-on-surface font-body-md text-body-md shadow-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline/70"
                      />
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div className="space-y-1.5">
                    <label className="block font-label-md text-label-md text-on-surface" htmlFor="reg-email">
                      Correo Electrónico <span aria-hidden="true" className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-body-md">mail</span>
                      </span>
                      <input
                        id="reg-email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        name="email"
                        placeholder="camila@ejemplo.com"
                        required
                        type="email"
                        className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface text-on-surface font-body-md text-body-md shadow-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline/70"
                      />
                    </div>
                  </div>

                  {/* Teléfono Móvil */}
                  <div className="space-y-1.5">
                    <label className="block font-label-md text-label-md text-on-surface" htmlFor="reg-telefono">
                      Teléfono Celular <span aria-hidden="true" className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-body-md">phone_iphone</span>
                      </span>
                      <input
                        id="reg-telefono"
                        value={regTelefono}
                        onChange={(e) => setRegTelefono(e.target.value)}
                        name="telefono"
                        pattern="[0-9]{10}"
                        placeholder="Ej. 312 456 7890"
                        required
                        type="tel"
                        className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface text-on-surface font-body-md text-body-md shadow-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline/70"
                      />
                    </div>
                  </div>

                  {/* Fecha de Nacimiento (+18) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-label-md text-label-md text-on-surface" htmlFor="reg-nacimiento">
                        Fecha de Nacimiento <span aria-hidden="true" className="text-error">*</span>
                      </label>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">
                        Mayor de 18 años
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-body-md">calendar_today</span>
                      </span>
                      <input
                        id="reg-nacimiento"
                        value={regNacimiento}
                        onChange={(e) => setRegNacimiento(e.target.value)}
                        name="nacimiento"
                        required
                        type="date"
                        className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface text-on-surface font-body-md text-body-md shadow-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1 pt-0.5">
                      <span className="material-symbols-outlined text-body-sm text-tertiary mt-0.5">info</span>
                      <span>Debes ser mayor de 18 años para iniciar un proceso de adopción en Colombia.</span>
                    </p>
                  </div>

                  {/* Contraseña Segura */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block font-label-md text-label-md text-on-surface" htmlFor="reg-pass">
                      Contraseña <span aria-hidden="true" className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-body-md">lock</span>
                      </span>
                      <input
                        id="reg-pass"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        minLength={8}
                        name="password"
                        placeholder="Mínimo 8 caracteres seguros (cifrado bcrypt/Argon2 en Supabase)"
                        required
                        type="password"
                        className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface text-on-surface font-body-md text-body-md shadow-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline/70"
                      />
                    </div>
                  </div>
                </div>

                {/* Checkbox Tratamiento de Datos Personales (Ley 1581 de 2012) */}
                <div className="pt-space-xs">
                  <label className="flex items-start gap-space-sm cursor-pointer select-none">
                    <input
                      id="reg-habeas-data"
                      checked={regHabeasData}
                      onChange={(e) => setRegHabeasData(e.target.checked)}
                      name="habeas_data"
                      required
                      type="checkbox"
                      className="mt-1 h-5 w-5 rounded text-primary focus:ring-secondary accent-primary"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Acepto expresamente la <a className="text-primary font-semibold underline" href="#">Política de Tratamiento de Datos Personales (Ley 1581 de 2012)</a> y los <a className="text-primary font-semibold underline" href="#">Términos y Condiciones de Pet-sible</a> para verificación en refugios aliados.
                    </span>
                  </label>
                </div>

                {/* Botón de Envío */}
                <div className="pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tus credenciales y datos viajan cifrados bajo protocolo TLS.
                  </p>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full sm:w-auto h-12 px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-md hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? 'Registrando...' : 'Completar Registro'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PANEL 2: INICIAR SESIÓN */}
          {activeTab === 'login' && !successMsg && (
            <div aria-labelledby="tab-login" id="panel-login" role="tabpanel">
              <form onSubmit={handleLoginSubmit} className="space-y-space-md max-w-md mx-auto" id="form-login" noValidate>
                <div className="space-y-1.5">
                  <label className="block font-label-md text-label-md text-on-surface" htmlFor="login-email">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                      <span className="material-symbols-outlined text-body-md">mail</span>
                    </span>
                    <input
                      id="login-email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      name="login_email"
                      placeholder="tu@correo.com"
                      required
                      type="email"
                      className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface text-on-surface font-body-md text-body-md shadow-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="login-pass">
                      Contraseña
                    </label>
                    <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-outline">
                      <span className="material-symbols-outlined text-body-md">lock</span>
                    </span>
                    <input
                      id="login-pass"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      name="login_password"
                      placeholder="Tu contraseña"
                      required
                      type="password"
                      className="w-full h-12 pl-11 pr-space-md rounded-lg bg-surface text-on-surface font-body-md text-body-md shadow-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full h-12 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-md hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
