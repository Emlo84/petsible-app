import React from 'react'
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  currentUser: User | null
  onOpenAuth: (tab: 'login' | 'register') => void
  onLogout: () => void
  selectedLocality: string
  onLocalityChange: (locality: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  selectedLocality,
  onLocalityChange,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">
        {/* Logo y Selector de Localidad */}
        <div className="flex items-center gap-space-lg">
          <a
            className="flex items-center gap-space-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-lg"
            href="#"
          >
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-xl">pets</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
              Pet-sible
            </span>
          </a>

          {/* Selector de Localidades de Bogotá */}
          <div className="hidden xl:flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full border border-surface-container">
            <span className="material-symbols-outlined text-secondary text-body-md">location_on</span>
            <label className="sr-only" htmlFor="bogota-locality-select">
              Seleccionar Localidad de Bogotá
            </label>
            <select
              id="bogota-locality-select"
              value={selectedLocality}
              onChange={(e) => onLocalityChange(e.target.value)}
              className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer pr-space-xs"
            >
              <option value="todas">Toda Bogotá D.C.</option>
              <option value="usaquen">Usaquén</option>
              <option value="chapinero">Chapinero</option>
              <option value="suba">Suba</option>
              <option value="teusaquillo">Teusaquillo</option>
              <option value="kennedy">Kennedy</option>
              <option value="engativa">Engativá</option>
              <option value="fontibon">Fontibón</option>
              <option value="santafe">Santa Fe</option>
              <option value="san-cristobal">San Cristóbal</option>
            </select>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-space-xs">
          <a
            aria-current="page"
            className="px-space-md py-space-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary bg-primary-container text-on-primary-container rounded-lg font-label-md"
            href="#"
          >
            Inicio
          </a>
          <a
            className="px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            href="#catalogo-preview"
          >
            Adoptar
          </a>
          <a
            className="px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            href="#seccion-beneficios"
          >
            Beneficios
          </a>
          <a
            className="px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            href="#seccion-testimonios"
          >
            Historias
          </a>
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface-variant">
            <span>Red 4 Refugios</span>
            <span className="bg-secondary text-on-secondary px-space-xs py-0.5 rounded-full font-label-sm text-label-sm tracking-wide uppercase">
              Verificados
            </span>
          </div>
        </nav>

        {/* Acciones y Perfil de Usuario */}
        <div className="flex items-center gap-space-sm md:gap-space-md">
          <button
            aria-label="Notificaciones y alertas de adopción"
            className="relative p-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            type="button"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-surface"></span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-on-surface truncate max-w-[140px]">
                  {currentUser.user_metadata?.full_name || currentUser.email}
                </p>
                <button
                  onClick={onLogout}
                  className="text-[11px] text-primary hover:underline font-medium"
                >
                  Cerrar Sesión
                </button>
              </div>
              <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm ring-2 ring-surface-container">
                {currentUser.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-lg text-primary hover:bg-surface-container font-label-md text-label-md transition-colors"
              >
                Ingresar
              </button>
              <a
                href="#catalogo-preview"
                className="inline-flex items-center justify-center h-10 px-4 sm:px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Adoptar ahora
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
