import { useState, useEffect } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import type { Pet } from './types/pet'
import type { UserProfile, HousingType, DailyTimeAvailable } from './types/user'
import { MOCK_PETS, DEFAULT_USER_PROFILE } from './data/mockData'
import { AuthService } from './services/supabase/authService'
import { Navbar } from './components/layout/Navbar'
import { HeroSection } from './components/home/HeroSection'
import { PetCatalog } from './components/catalog/PetCatalog'
import { AuthSection } from './components/auth/AuthSection'
import { BenefitsSection } from './components/home/BenefitsSection'
import { TestimonialsSection } from './components/home/TestimonialsSection'
import { Footer } from './components/layout/Footer'
import { ScheduleModal } from './components/appointments/ScheduleModal'

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE)
  const [selectedLocality, setSelectedLocality] = useState<string>('todas')
  const [selectedPetForAppointment, setSelectedPetForAppointment] = useState<Pet | null>(null)
  const [showProfileDrawer, setShowProfileDrawer] = useState<boolean>(false)
  const [authSectionTab, setAuthSectionTab] = useState<'register' | 'login'>('register')

  // Escuchar estado de sesión de Supabase
  useEffect(() => {
    AuthService.getCurrentUser().then((user) => {
      setCurrentUser(user)
    })

    const { data: authListener } = AuthService.onAuthStateChange((session: Session | null) => {
      setCurrentUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleOpenAuth = (tab: 'register' | 'login') => {
    setAuthSectionTab(tab)
    const element = document.getElementById('seccion-auth')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLogout = async () => {
    await AuthService.logout()
    setCurrentUser(null)
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed flex flex-col">
      {/* 1. Barra de Navegación Principal */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        selectedLocality={selectedLocality}
        onLocalityChange={setSelectedLocality}
      />

      <main className="w-full flex-1">
        {/* 2. Hero Principal Editorial con Métricas de Bogotá */}
        <HeroSection onOpenRegister={() => handleOpenAuth('register')} />

        {/* 3. Barra de Control para Simulación de Parámetros de Afinidad */}
        <div className="bg-surface-container-low border-y border-surface-container py-3 px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-on-surface font-semibold">
              <span className="material-symbols-outlined text-sm text-secondary">tune</span>
              <span>Simulador de Afinidad (MVP):</span>
              <span className="text-on-surface-variant font-normal">
                Prueba cómo el algoritmo filtra según vivienda y tiempo
              </span>
            </div>

            <button
              onClick={() => setShowProfileDrawer(!showProfileDrawer)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-container hover:bg-surface-container text-primary font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">settings</span>
              <span>{showProfileDrawer ? 'Ocultar Parámetros' : 'Ajustar Estilo de Vida'}</span>
            </button>
          </div>
        </div>

        {/* Panel Desplegable para Ajustar Estilo de Vida en Vivo */}
        {showProfileDrawer && (
          <section className="bg-surface-container border-b border-surface-container py-6 px-margin md:px-margin-tablet lg:px-margin-desktop animate-fade-in">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">psychology</span>
                  Variables del Perfil Evaluadas por el Algoritmo de Afinidad
                </h3>
                <span className="text-xs text-secondary font-semibold">
                  Se reevalúan los 4 refugios en milisegundos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                {/* Tipo de Vivienda */}
                <div className="p-3 bg-surface border border-surface-container rounded-xl shadow-xs">
                  <label className="text-on-surface-variant flex items-center gap-1.5 mb-2 font-semibold" htmlFor="housing-select">
                    <span className="material-symbols-outlined text-sm text-primary">home</span> Vivienda
                  </label>
                  <select
                    id="housing-select"
                    value={profile.housingType}
                    onChange={(e) =>
                      setProfile({ ...profile, housingType: e.target.value as HousingType })
                    }
                    className="w-full bg-surface-container-low border border-surface-container rounded-lg px-2.5 py-1.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="apartment_small">Apartamento Pequeño</option>
                    <option value="apartment_large">Apartamento Grande</option>
                    <option value="house_no_yard">Casa sin patio</option>
                    <option value="house_with_yard">Casa con patio cercado</option>
                  </select>
                </div>

                {/* Tiempo Disponible */}
                <div className="p-3 bg-surface border border-surface-container rounded-xl shadow-xs">
                  <label className="text-on-surface-variant flex items-center gap-1.5 mb-2 font-semibold" htmlFor="time-select">
                    <span className="material-symbols-outlined text-sm text-secondary">schedule</span> Tiempo Diario
                  </label>
                  <select
                    id="time-select"
                    value={profile.timeAvailable}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        timeAvailable: e.target.value as DailyTimeAvailable,
                      })
                    }
                    className="w-full bg-surface-container-low border border-surface-container rounded-lg px-2.5 py-1.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="under_2h">Menos de 2 horas</option>
                    <option value="2_to_4h">De 2 a 4 horas</option>
                    <option value="more_than_4h">Más de 4 horas</option>
                  </select>
                </div>

                {/* Convivencia Niños */}
                <div className="p-3 bg-surface border border-surface-container rounded-xl shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-on-surface-variant flex items-center gap-1.5 font-semibold">
                      <span className="material-symbols-outlined text-sm text-tertiary">family_restroom</span> ¿Hay niños?
                    </p>
                    <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                      {profile.hasChildren ? 'Filtra perros aptos niños' : 'Cualquiera'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.hasChildren}
                    onChange={(e) => setProfile({ ...profile, hasChildren: e.target.checked })}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                </div>

                {/* Otras Mascotas */}
                <div className="p-3 bg-surface border border-surface-container rounded-xl shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-on-surface-variant flex items-center gap-1.5 font-semibold">
                      <span className="material-symbols-outlined text-sm text-secondary">pets</span> ¿Otras mascotas?
                    </p>
                    <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                      {profile.hasOtherPets ? 'Filtra sociables' : 'Cualquiera'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.hasOtherPets}
                    onChange={(e) => setProfile({ ...profile, hasOtherPets: e.target.checked })}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. Catálogo de Tarjetas Desplazables (Interactivo & Conectado a Supabase) */}
        <PetCatalog
          userProfile={profile}
          initialPets={MOCK_PETS}
          onOpenScheduleModal={(pet) => setSelectedPetForAppointment(pet)}
          selectedLocality={selectedLocality}
        />

        {/* 5. Sección de Autenticación Unificada (Registro +18, Habeas Data, Login) */}
        <AuthSection
          initialTab={authSectionTab}
          onAuthSuccess={(user) => {
            setCurrentUser(user)
          }}
        />

        {/* 6. Beneficios Diferenciales Pet-sible Bogotá */}
        <BenefitsSection />

        {/* 7. Historias y Testimonios de Adoptantes Reales */}
        <TestimonialsSection />

        {/* 8. Banner CTA Final */}
        <section className="py-space-xl px-margin md:px-margin-tablet lg:px-margin-desktop bg-surface-container">
          <div className="max-w-5xl mx-auto rounded-3xl bg-secondary text-on-secondary p-space-lg sm:p-space-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
            <div className="space-y-space-xs text-center md:text-left">
              <h2 className="font-headline-lg text-headline-lg text-on-secondary font-bold">
                ¿Listo para cambiar una vida en Bogotá?
              </h2>
              <p className="font-body-md text-body-md text-secondary-fixed max-w-lg">
                Más de 1.200 animales rescatados esperan un hogar lleno de cariño y protección en nuestra ciudad.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-space-sm shrink-0">
              <button
                onClick={() => handleOpenAuth('register')}
                type="button"
                className="inline-flex items-center justify-center h-12 px-space-xl rounded-lg bg-surface text-secondary hover:bg-surface-container-low font-label-md text-label-md font-bold shadow-md transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-surface cursor-pointer"
              >
                Registrarme para Adoptar
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Modal de Agendamiento Sin Solapamiento */}
      {selectedPetForAppointment && (
        <ScheduleModal
          pet={selectedPetForAppointment}
          adopterId={currentUser?.id || profile.id}
          onClose={() => setSelectedPetForAppointment(null)}
          onSuccess={() => setSelectedPetForAppointment(null)}
        />
      )}

      {/* 10. Footer con Líneas Distritales IDPYBA y Legal */}
      <Footer />
    </div>
  )
}
