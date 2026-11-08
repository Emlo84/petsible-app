import React from 'react'

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-space-xl px-margin md:px-margin-tablet lg:px-margin-desktop bg-surface-container-low" id="seccion-beneficios">
      <div className="max-w-7xl mx-auto space-y-space-xl">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
            ¿Por Qué Pet-sible?
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
            Adopciones diseñadas para convivir en Bogotá
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Adaptamos el proceso a las dinámicas urbanas reales: apartamentos en Chapinero, casas con jardín en Suba o convivencia en conjuntos cerrados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-tablet lg:gap-gutter-desktop">
          {/* Beneficio 1: Match de Estilo de Vida */}
          <div className="p-space-lg rounded-2xl bg-surface shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container">
            <div className="space-y-space-md">
              <div className="w-14 h-14 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-headline-md">psychology_alt</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Match de Compatibilidad Real
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Analizamos tus rutinas, metros cuadrados de vivienda y tiempo disponible para sugerirte el animal idóneo, reduciendo la tasa de devoluciones a cero.
              </p>
            </div>
            <div className="pt-space-md flex items-center gap-space-xs text-primary font-label-md text-label-md">
              <span>Filtros por nivel de energía</span>
              <span className="material-symbols-outlined text-body-md">speed</span>
            </div>
          </div>

          {/* Beneficio 2: Acompañamiento Veterinario */}
          <div className="p-space-lg rounded-2xl bg-surface shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container">
            <div className="space-y-space-md">
              <div className="w-14 h-14 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-headline-md">medical_services</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Acompañamiento Veterinario
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Todos los animales cuentan con esquema de vacunación al día, esterilización garantizada y chip de identificación distrital IDPYBA incluido.
              </p>
            </div>
            <div className="pt-space-md flex items-center gap-space-xs text-secondary font-label-md text-label-md">
              <span>Carné digital certificado</span>
              <span className="material-symbols-outlined text-body-md">verified_user</span>
            </div>
          </div>

          {/* Beneficio 3: Visitas Programadas Seguras */}
          <div className="p-space-lg rounded-2xl bg-surface shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container">
            <div className="space-y-space-md">
              <div className="w-14 h-14 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-headline-md">calendar_clock</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Visitas Programadas Seguras
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Conoce a tu futuro compañero en un entorno controlado con educadores caninos o felinos, con asesoría para la aclimatación a tu hogar.
              </p>
            </div>
            <div className="pt-space-md flex items-center gap-space-xs text-tertiary font-label-md text-label-md">
              <span>Encuentros sin estrés</span>
              <span className="material-symbols-outlined text-body-md">handshake</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
