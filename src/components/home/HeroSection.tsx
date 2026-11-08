import React from 'react'

interface HeroSectionProps {
  onOpenRegister: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pb-24 px-margin md:px-margin-tablet lg:px-margin-desktop bg-surface-container-low">
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-primary-fixed/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          {/* Columna Izquierda: Mensaje y CTA */}
          <div className="lg:col-span-7 flex flex-col space-y-space-lg">
            <div className="inline-flex items-center gap-space-xs self-start px-space-md py-1.5 rounded-full bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-label-md">pets</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Red Distrital de Adopción Responsable
              </span>
            </div>

            <div className="space-y-space-sm">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-tight">
                Conecta con tu compañero ideal en{' '}
                <span className="text-primary underline decoration-primary-fixed decoration-wavy underline-offset-8">
                  Bogotá
                </span>
                .
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl pt-space-xs">
                Adopción transparente, responsable y llena de amor. Integramos refugios certificados
                de Suba, Usaquén, Kennedy y más localidades para que encuentres tu vínculo de vida
                con garantías éticas y legales.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <a
                className="inline-flex items-center justify-center gap-space-xs h-12 px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
                href="#catalogo-preview"
              >
                <span>Explorar Mascotas</span>
                <span className="material-symbols-outlined text-label-lg">arrow_forward</span>
              </a>

              <button
                onClick={onOpenRegister}
                type="button"
                className="inline-flex items-center justify-center gap-space-xs h-12 px-space-xl rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary cursor-pointer"
              >
                <span className="material-symbols-outlined text-label-lg">person_add</span>
                <span>Crear Cuenta</span>
              </button>
            </div>

            {/* Métricas Bogotá Reales */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md pt-space-md">
              <div className="p-space-md rounded-xl bg-surface shadow-sm border border-surface-container">
                <p className="font-headline-lg text-headline-lg text-primary font-extrabold">+1.240</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Perritos y gaticos rescatados en Bogotá
                </p>
              </div>

              <div className="p-space-md rounded-xl bg-surface shadow-sm border border-surface-container">
                <p className="font-headline-lg text-headline-lg text-secondary font-extrabold">4</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Refugios aliados verificados
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1 p-space-md rounded-xl bg-surface shadow-sm border border-surface-container flex flex-col justify-between">
                <div className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-label-md">verified</span>
                  <span className="font-label-sm text-label-sm font-bold">100% IDPYBA</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Protocolo de bienestar animal estricto
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Mosaico Asimétrico con Bogotá Vibes */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Imagen Principal */}
              <div className="rounded-2xl overflow-hidden shadow-xl bg-surface-container">
                <img
                  className="w-full h-80 sm:h-96 object-cover"
                  alt="Joven en Bogotá con perro rescatado mestizo"
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                />
              </div>

              {/* Card Flotante Superpuesta: Caso de Éxito en Usaquén */}
              <div className="hidden sm:flex absolute -bottom-6 -left-8 p-space-md rounded-xl bg-surface shadow-xl items-center gap-space-md max-w-xs border border-surface-container">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    alt="Retrato de gatito rescatado"
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="font-label-sm text-label-sm text-secondary font-bold">
                      Adoptado ayer
                    </span>
                  </div>
                  <p className="font-headline-sm text-label-lg text-on-surface leading-tight font-bold">
                    Oliver &bull; Usaquén
                  </p>
                  <p className="font-body-sm text-label-sm text-on-surface-variant">
                    Hogar definitivo verificado
                  </p>
                </div>
              </div>

              {/* Insignia Flotante: Certificación Legal */}
              <div className="absolute -top-4 -right-4 bg-primary text-on-primary p-space-sm px-space-md rounded-xl shadow-lg flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-label-md">shield</span>
                <span className="font-label-sm text-label-sm font-semibold">Proceso Ético Bogotá</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
