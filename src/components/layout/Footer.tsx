import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant border-t border-surface-container">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-tablet lg:gap-gutter-desktop mb-space-xl">
          {/* Columna 1: Brand y Bogotá */}
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-xs">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-lg">pets</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                Pet-sible
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Red solidaria y transparente para la adopción responsable de animales rescatados en Bogotá D.C. Vinculamos hogares amorosos con refugios certificados en cada localidad.
            </p>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-body-md">pets</span>
              <span>Bogotá, Distrito Capital &bull; Colombia</span>
            </div>
          </div>

          {/* Columna 2: Líneas Bienestar Animal */}
          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-label-lg text-on-surface font-bold">
              Líneas Bienestar Animal Bogotá
            </h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-primary text-body-md mt-0.5">
                  emergency
                </span>
                <div>
                  <p className="font-label-md text-on-surface font-semibold">Urgencias Veterinarias IDPYBA</p>
                  <p className="text-on-surface-variant">Línea telefónica 123 (Distrital)</p>
                </div>
              </li>
              <li className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-body-md mt-0.5">
                  report
                </span>
                <div>
                  <p className="font-label-md text-on-surface font-semibold">Reporte de Maltrato Escuadrón</p>
                  <p className="text-on-surface-variant">01 8000 115 110</p>
                </div>
              </li>
              <li className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-body-md mt-0.5">
                  domain
                </span>
                <div>
                  <p className="font-label-md text-on-surface font-semibold">Unidad de Cuidado Animal (UCA)</p>
                  <p className="text-on-surface-variant">Carrera 106A # 67 - 02, Engativá</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 3: Refugios */}
          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-label-lg text-on-surface font-bold">
              Comunidad y Refugios
            </h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li>
                <a className="hover:text-on-surface transition-colors" href="#catalogo-preview">
                  Catálogo de Adopción Bogotá
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  Red de los 4 Refugios Aliados
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#seccion-beneficios">
                  Jornadas de Visita en Localidades
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  Guía de Tenencia Responsable
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Privacidad y Legal */}
          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-label-lg text-on-surface font-bold">
              Privacidad y Legal
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Cumplimiento estricto de la Ley Estatutaria 1581 de 2012 de Protección de Datos Personales (Habeas Data) en el territorio colombiano.
            </p>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  Tratamiento de Datos y Adopciones
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  Términos de Compromiso de Adopción
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-space-lg border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-sm text-label-sm">
          <p>&copy; 2026 Pet-sible Bogotá. Conectando vidas por el bienestar animal.</p>
          <div className="flex items-center gap-space-lg">
            <span>Hecho con amor y responsabilidad en Bogotá D.C.</span>
            <span className="material-symbols-outlined text-primary text-body-md">favorite</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
